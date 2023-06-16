import React, { useContext, useState } from "react";
import style from "../../styles/adminpanel.module.css";
import { Context } from "../..";
import { deleteLesson } from "../../http/lessonAPI";
import EditLesson from "../modals/EditLesson";

const LessonsDB = ({ query }) => {
	const { lesson } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const [lessonToEdit, setLessonToEdit] = useState(null);

	const handleDeleteLesson = (id) => {
		deleteLesson(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні заняття з БД!");
			});
	};

	const handleEditLesson = (lesson) => {
		setLessonToEdit(lesson);
		setIsOpen(true);
	};

	const filteredLessons = lesson.lessons.filter((lesson) => {
		return lesson.name.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			{filteredLessons.map((lesson) => (
				<li key={lesson.id}>
					<p onClick={() => handleEditLesson(lesson)} className={style.edit}>
						{lesson.name}
					</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={lesson.id}
						onClick={() => handleDeleteLesson(lesson.id)}
					>
						Видалити
					</button>
				</li>
			))}
			{lessonToEdit && isOpen && (
				<EditLesson lesson={lessonToEdit} setIsOpen={setIsOpen} />
			)}
		</>
	);
};

export default LessonsDB;
