import React, { useContext, useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import LessonList from "../components/LessonList";
import Container from "../components/Container";
import Search from "../components/Search";
import Pages from "../components/Pages";
import { fetchLessons } from "../http/lessonAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { fetchSpecialties } from "../http/specialtyAPI";
import { fetchCourses } from "../http/courseAPI";
import { fetchTypes } from "../http/typeAPI";

const Main = ({ userId }) => {
	const { lesson, specialty, course, type } = useContext(Context);
	const [query, setQuery] = useState("");
	const [selectedCourses, setSelectedCourses] = useState([]);
	const [selectedSpecialties, setSelectedSpecialties] = useState([]);
	const [user, setUser] = useState(userId === 1 ? null : userId);

	useEffect(() => {
		fetchSpecialties().then((data) => specialty.setSpecialties(data));
		fetchCourses().then((data) => course.setCourses(data));
		fetchTypes().then((data) => type.setTypes(data));
		fetchLessons(null, null, null, 30, 1).then((data) => {
			lesson.setLessons(data.rows);
			lesson.setTotalCount(data.count);
		});
	}, []);

	useEffect(() => {
		fetchLessons(
			user,
			selectedSpecialties,
			selectedCourses,
			30,
			lesson.page
		).then((data) => {
			lesson.setLessons(data.rows);
			lesson.setTotalCount(data.count);
		});
	}, [selectedSpecialties, selectedCourses, lesson.page]);

	return (
		<Container style={{ justifyContent: "flex-start" }}>
			<LeftSidebar
				setSelectedCourses={setSelectedCourses}
				setSelectedSpecialties={setSelectedSpecialties}
				userId={userId}
			/>
			<Container
				style={{ flexDirection: "column", width: "100%", alignItems: "center" }}
			>
				<Search setSearchQuery={setQuery} />
				<LessonList
					query={query}
					selectedCourses={selectedCourses}
					selectedSpecialties={selectedSpecialties}
				/>
				<Pages />
			</Container>
		</Container>
	);
};

export default observer(Main);
