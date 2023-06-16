import React, { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import LeftSidebar from "../components/LeftSidebar";
import MaterialList from "../components/MaterialList";
import { useParams } from "react-router-dom";
import style from "../styles/material.module.css";
import { Context } from "..";
import { fetchOneLesson } from "../http/lessonAPI";
import { observer } from "mobx-react-lite";
import { fetchMaterials } from "../http/materialAPI";
import MaterialPages from "../components/MaterialPages";

const LessonPage = ({ userId }) => {
	const { material } = useContext(Context);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [lesson, setLesson] = useState("");

	const { id } = useParams();

	useEffect(() => {
		fetchOneLesson(id).then((data) => setLesson(data));
		fetchMaterials(id, null, 5, 1).then((data) => {
			material.setMaterials(data.rows);
			material.setTotalCount(data.count);
		});
	}, []);

	useEffect(() => {
		fetchMaterials(id, selectedTypes, null, material.page).then((data) => {
			material.setMaterials(data.rows);
			material.setTotalCount(data.count);
		});
	}, [id, selectedTypes, material.page]);

	return (
		<Container>
			<LeftSidebar setSelectedTypes={setSelectedTypes} userId={userId} />
			<Container
				style={{ flexDirection: "column", width: "100%", alignItems: "center" }}
			>
				<h1>{lesson.name}</h1>
				{selectedTypes.length === 0 ? (
					<iframe
						key={lesson.id}
						className={style.viewer}
						title={lesson.annotationLink ? lesson.name : "Lesson not found"}
						src={lesson.annotationLink}
					></iframe>
				) : (
					<>
						<MaterialList selectedTypes={selectedTypes} lessonId={id} />
						<MaterialPages />
					</>
				)}
			</Container>
		</Container>
	);
};

export default observer(LessonPage);
