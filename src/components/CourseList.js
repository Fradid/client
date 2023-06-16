import React, { useContext } from "react";
import style from "../styles/filter.module.css";
import { Context } from "..";
import CourseItem from "./CourseItem";
import { observer } from "mobx-react-lite";

const CourseList = ({ handleCourseChange }) => {
	const { course } = useContext(Context);

	return (
		<ul className={style.content}>
			{course.courses.map((course) => (
				<CourseItem
					key={course.id}
					course={course}
					handleCourseChange={handleCourseChange}
				/>
			))}
		</ul>
	);
};

export default observer(CourseList);
