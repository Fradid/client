import React, { useContext } from "react";
import style from "../../styles/adminpanel.module.css";
import { Context } from "../..";
import { deleteCourse } from "../../http/courseAPI";

const CoursesDB = ({ query }) => {
	const { course } = useContext(Context);

	const handleDeleteCourse = (id) => {
		deleteCourse(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні курсу з БД!");
			});
	};

	const filteredCourses = course.courses.filter((course) => {
		return course.number.toString().includes(query);
	});

	return (
		<>
			{filteredCourses.map((course) => (
				<li key={course.id}>
					<p>{course.number}</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={course.id}
						onClick={() => handleDeleteCourse(course.id)}
					>
						Видалити
					</button>
				</li>
			))}
		</>
	);
};

export default CoursesDB;
