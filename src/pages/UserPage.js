import React, { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import style from "../styles/user.module.css";
import { Context } from "..";
import defaultImg from "../assets/defaultProfilePicture.jpg";
import EditUser from "../components/modals/EditUser";
import CreateMaterial from "../components/modals/CreateMaterial";
import { fetchOneUser } from "../http/userAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchLessons } from "../http/lessonAPI";
import { fetchTypes } from "../http/typeAPI";
import MaterialsToEdit from "../components/MaterialsToEdit";
import styles from "../styles/adminpanel.module.css";

const UserPage = () => {
	const { lesson, type } = useContext(Context);

	const { id } = useParams();

	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState("");
	const [lessonId, setLessonId] = useState("");
	const [showMaterials, setShowMaterials] = useState(false);

	useEffect(() => {
		fetchTypes().then((data) => type.setTypes(data));
		fetchOneUser(id).then((data) => setUser(data));
		fetchLessons(id, null, null, null, 1).then((data) => {
			lesson.setLessons(data.rows);
		});
	}, []);

	const handleOpenModal = (modalType) => {
		setIsOpen(modalType);
	};

	const handleLessonClick = (lessonId) => {
		setLessonId(lessonId);
		setShowMaterials(true);
	};

	const handleGoBack = () => {
		setShowMaterials(false);
	};

	return (
		<Container style={{ flexDirection: "column" }}>
			<Container style={{ justifyContent: "space-around", minHeight: "auto" }}>
				<div className={style.profile}>
					<img
						src={
							user.image
								? process.env.REACT_APP_API_URL + user.image
								: defaultImg
						}
						className={style.image}
						alt="profilePicture"
					/>
					<div className={style.info}>
						<p className={style.pName}>{user.fullName}</p>
						<p className={style.pInfo}>Викладач</p>
					</div>
				</div>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("editU")}
				>
					<i className="fa-solid fa-user-pen"></i>
				</button>
				{isOpen === "editU" && <EditUser setIsOpen={setIsOpen} user={user} />}
			</Container>
			<Container style={{ justifyContent: "center" }}>
				{showMaterials ? (
					<Container
						style={{
							flexDirection: "column",
							width: "100%",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
					>
						<button
							className={`${styles.button} ${styles.btn}`}
							onClick={handleGoBack}
						>
							Повернутися назад
						</button>
						<MaterialsToEdit id={lessonId} />
					</Container>
				) : (
					<div className={style.lessons}>
						<ul className={style.name}>
							{lesson.lessons.map((lesson) => (
								<li key={lesson.id}>
									<p
										onClick={() => handleLessonClick(lesson.id)}
										key={lesson.id}
										className={style.edit}
									>
										{lesson.name}
									</p>
									<button
										className={`${style.buttonLess} ${style.btnLess}`}
										onClick={() => {
											handleOpenModal("createM");
											setLessonId(lesson.id);
										}}
									>
										Додати
									</button>
								</li>
							))}
						</ul>
						{isOpen === "createM" && (
							<CreateMaterial setIsOpen={setIsOpen} id={lessonId} />
						)}
					</div>
				)}
			</Container>
		</Container>
	);
};

export default observer(UserPage);
