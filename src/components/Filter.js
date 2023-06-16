import React, { useContext, useEffect, useRef } from "react";
import style from "../styles/filter.module.css";
import SpecialtyList from "./SpecialtyList";
import CourseList from "./CourseList";
import TypeList from "./TypeList";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTypes } from "../http/typeAPI";

const Filter = ({
	setSelectedCourses,
	setSelectedSpecialties,
	setSelectedTypes,
}) => {
	const { type } = useContext(Context);
	const accordionRefs = useRef([]);
	const location = useLocation();
	const lessonRoute = location.pathname.startsWith("/lesson/");

	useEffect(() => {
		fetchTypes().then((data) => type.setTypes(data));
	}, []);

	const handleClick = (index) => {
		const accordionRef = accordionRefs.current[index];
		accordionRef.classList.toggle(style.active);
		const panel = accordionRef.nextElementSibling;
		panel.style.maxHeight = panel.style.maxHeight
			? null
			: panel.scrollHeight + "px";
	};

	const handleCourseChange = (courseId) => {
		setSelectedCourses((selectedCourses) => {
			if (selectedCourses.includes(courseId)) {
				return selectedCourses.filter((c) => c !== courseId);
			} else {
				return [...selectedCourses, courseId];
			}
		});
	};

	const handleSpecialtyChange = (specialtyId) => {
		setSelectedSpecialties((selectedSpecialties) => {
			if (selectedSpecialties.includes(specialtyId)) {
				return selectedSpecialties.filter((s) => s !== specialtyId);
			} else {
				return [...selectedSpecialties, specialtyId];
			}
		});
	};

	const handleTypeChange = (typeId) => {
		setSelectedTypes((selectedTypes) => {
			if (selectedTypes.includes(typeId)) {
				return selectedTypes.filter((t) => t !== typeId);
			} else {
				return [...selectedTypes, typeId];
			}
		});
	};

	return (
		<div className={style.filter}>
			<ul>
				<p className={style.title}>Фільтр</p>
				{!lessonRoute && (
					<>
						<li>
							<p
								className={style.accordion}
								ref={(el) => (accordionRefs.current[0] = el)}
								onClick={() => handleClick(0)}
							>
								Спеціальності
							</p>
							<SpecialtyList handleSpecialtyChange={handleSpecialtyChange} />
						</li>
						<li>
							<p
								className={style.accordion}
								style={{
									borderTop: "1px solid var(--color-accent)",
									borderBottomLeftRadius: "8px",
									borderBottomRightRadius: "8px",
								}}
								ref={(el) => (accordionRefs.current[1] = el)}
								onClick={() => handleClick(1)}
							>
								Курси
							</p>
							<CourseList handleCourseChange={handleCourseChange} />
						</li>
					</>
				)}

				{lessonRoute && (
					<li>
						<p
							className={style.accordion}
							style={{
								borderBottomLeftRadius: "8px",
								borderBottomRightRadius: "8px",
							}}
							ref={(el) => (accordionRefs.current[2] = el)}
							onClick={() => handleClick(2)}
						>
							Типи занять
						</p>
						<TypeList handleTypeChange={handleTypeChange} />
					</li>
				)}
			</ul>
		</div>
	);
};

export default observer(Filter);
