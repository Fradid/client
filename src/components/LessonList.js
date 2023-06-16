import React, { useContext } from "react";
import { Context } from "..";
import LessonItem from "./LessonItem";
import "../styles/list.css";
import { observer } from "mobx-react-lite";

const LessonList = ({ query, selectedCourses, selectedSpecialties }) => {
	const { lesson } = useContext(Context);

	const filteredLessons = lesson.lessons.filter((lesson) => {
		return (
			lesson.name.toLowerCase().includes(query.toLowerCase()) &&
			(selectedCourses.length === 0 ||
				selectedCourses.includes(lesson.courseId)) &&
			(selectedSpecialties.length === 0 ||
				selectedSpecialties.includes(lesson.specialtyId))
		);
	});

	return (
		<div className="grid">
			{filteredLessons.map((lesson) => (
				<LessonItem key={lesson.id} lesson={lesson} />
			))}
		</div>
	);
};

export default observer(LessonList);
