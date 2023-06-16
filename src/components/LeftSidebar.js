import React, { useState } from "react";
import Container from "./Container";
import Filter from "./Filter";
import ProfileInfo from "./ProfileInfo";
import { observer } from "mobx-react-lite";
import style from "../styles/leftsidebar.module.css";

const LeftSidebar = ({
	setSelectedCourses,
	setSelectedSpecialties,
	setSelectedTypes,
	userId,
}) => {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<Container style={{ flexDirection: "column", alignItems: "center" }}>
			<div
				className={click ? `${style.menu} ${style.active}` : style.menu}
				onClick={handleClick}
			>
				<i
					className={click ? "fas fa-times" : "fas fa-filter"}
					style={{ fontSize: "1.5rem" }}
				></i>
			</div>
			<div className={click ? `${style.filter} ${style.active}` : style.filter}>
				<ProfileInfo userId={userId} />
				<Filter
					setSelectedCourses={setSelectedCourses}
					setSelectedSpecialties={setSelectedSpecialties}
					setSelectedTypes={setSelectedTypes}
				/>
			</div>
		</Container>
	);
};

export default observer(LeftSidebar);
