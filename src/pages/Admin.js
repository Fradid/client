import React, { useContext, useEffect, useState } from "react";
import style from "../styles/adminpanel.module.css";
import Container from "../components/Container";
import CreateUser from "../components/modals/CreateUser";
import SpecialtiesDB from "../components/lists/SpecialtiesDB";
import CoursesDB from "../components/lists/CoursesDB";
import CreateSpecialty from "../components/modals/CreateSpecialty";
import CreateCourse from "../components/modals/CreateCourse";
import CreateLesson from "../components/modals/CreateLesson";
import CreateType from "../components/modals/CreateType";
import LessonsDB from "../components/lists/LessonsDB";
import TypesDB from "../components/lists/TypesDB";
import UserDB from "../components/lists/UserDB";
import { observer } from "mobx-react-lite";
import { fetchUsers } from "../http/userAPI";
import { Context } from "..";
import { fetchCourses } from "../http/courseAPI";
import { fetchSpecialties } from "../http/specialtyAPI";
import { fetchTypes } from "../http/typeAPI";
import Search from "../components/Search";
import { fetchLessons } from "../http/lessonAPI";

const Admin = () => {
	const { user, specialty, type, course, lesson } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDatabase, setSelectedDatabase] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {
		fetchUsers().then((data) => user.setUser(data));
		fetchCourses().then((data) => course.setCourses(data));
		fetchSpecialties().then((data) => specialty.setSpecialties(data));
		fetchTypes().then((data) => type.setTypes(data));
		fetchLessons(null, null, null, 100, null).then((data) =>
			lesson.setLessons(data.rows)
		);
	}, []);

	const handleDatabaseChange = (event) => {
		setSelectedDatabase(event.target.value);
	};

	const handleOpenModal = (modalType) => {
		setIsOpen(modalType);
	};

	return (
		<Container
			style={{
				flexDirection: "column",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-evenly",
			}}
		>
			<div className={style.btnContainer}>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("user")}
				>
					Додати користувача
				</button>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("specialty")}
				>
					Додати спеціальність
				</button>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("course")}
				>
					Додати курс
				</button>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("lesson")}
				>
					Додати заняття
				</button>
				<button
					className={`${style.button} ${style.btn}`}
					onClick={() => handleOpenModal("type")}
				>
					Додати тип матеріалу
				</button>
			</div>
			{isOpen === "user" && <CreateUser setIsOpen={setIsOpen} />}
			{isOpen === "specialty" && <CreateSpecialty setIsOpen={setIsOpen} />}
			{isOpen === "course" && <CreateCourse setIsOpen={setIsOpen} />}
			{isOpen === "lesson" && <CreateLesson setIsOpen={setIsOpen} />}
			{isOpen === "type" && <CreateType setIsOpen={setIsOpen} />}
			<div>
				<select
					className={`${style.dataBase} ${style.wid}`}
					onChange={handleDatabaseChange}
					defaultValue=""
				>
					<option>Вибрати базу даних</option>
					<option>Користувачі</option>
					<option>Спеціальності</option>
					<option>Курси</option>
					<option>Заняття</option>
					<option>Типи матеріалів</option>
				</select>
			</div>
			<Search setSearchQuery={setQuery} />
			<div className={style.sorted}>
				{selectedDatabase === "" ||
				selectedDatabase === "Вибрати базу даних" ? (
					<h1 className={style.attention}>Виберіть базу даних</h1>
				) : (
					<ul className={style.name}>
						{selectedDatabase === "Користувачі" && <UserDB query={query} />}
						{selectedDatabase === "Спеціальності" && (
							<SpecialtiesDB query={query} />
						)}
						{selectedDatabase === "Курси" && <CoursesDB query={query} />}
						{selectedDatabase === "Заняття" && <LessonsDB query={query} />}
						{selectedDatabase === "Типи матеріалів" && (
							<TypesDB query={query} />
						)}
					</ul>
				)}
			</div>
		</Container>
	);
};

export default observer(Admin);
