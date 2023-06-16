import React from "react";
import "../styles/item.css";
import { useNavigate } from "react-router-dom";
import { LESSON_ROUTE } from "../utils/consts";

const LessonItem = ({ lesson }) => {
	const navigate = useNavigate();
	const handleLessonClick = () => {
		navigate(`${LESSON_ROUTE}/${lesson.id}`);
	};

	return (
		<div className="buttonGr name" onClick={handleLessonClick}>
			<p>{lesson.name}</p>
		</div>
	);
};

export default LessonItem;
