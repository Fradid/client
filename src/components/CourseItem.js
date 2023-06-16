import React from "react";
import style from "../styles/filter.module.css";

const CourseItem = ({ course, handleCourseChange }) => {
	// const [selectedCourses, setSelectedCourses] = useState([]);

	// const handleCourseChange = (event) => {
	// 	const course = Number(event.target.value);
	// 	setSelectedCourses((selectedCourses) => {
	// 		if (selectedCourses.includes(course)) {
	// 			return selectedCourses.filter((c) => c !== course);
	// 		} else {
	// 			return [...selectedCourses, course];
	// 		}
	// 	});
	// };

	return (
		<li className={style.inptlist}>
			<label className={style.inputs}>
				<input
					type="checkbox"
					value={course.id}
					checked={course.isChecked}
					onChange={() => handleCourseChange(course.id)}
				/>
				<span className={style.name}>{course.number}</span>
			</label>
		</li>
	);
};

export default CourseItem;
