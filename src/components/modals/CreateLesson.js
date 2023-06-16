import React, { useContext, useState } from "react";
import style from "../../styles/adminpanel.module.css";
import { Context } from "../..";
import Modal from "../Modal";
import { createLesson } from "../../http/lessonAPI";
import styles from "../../styles/auth.module.css";

const CreateLesson = ({ setIsOpen }) => {
	const { user, specialty, course } = useContext(Context);
	const [name, setName] = useState("");
	const [annotationLink, setLink] = useState("");
	const [userId, setUserId] = useState("");
	const [specialtyId, setSpecialtyId] = useState("");
	const [courseId, setCourseId] = useState("");
	const [nameError, setNameError] = useState("");
	const [linkError, setLinkError] = useState("");
	const [userIdError, setUserIdError] = useState("");
	const [specialtyIdError, setSpecialtyIdError] = useState("");
	const [courseIdError, setCourseIdError] = useState("");

	const handleSubmit = async () => {
		try {
			await createLesson(name, annotationLink, userId, specialtyId, courseId);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasNameError = false;
				let hasLinkError = false;
				let hasUserIdError = false;
				let hasSpecialtyIdError = false;
				let hasCourseIdError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "name") {
						hasNameError = true;
						setNameError(error.msg);
					} else if (error.path === "annotationLink") {
						hasLinkError = true;
						setLinkError(error.msg);
					} else if (error.path === "userId") {
						hasUserIdError = true;
						setUserIdError(error.msg);
					} else if (error.path === "specialtyId") {
						hasSpecialtyIdError = true;
						setSpecialtyIdError(error.msg);
					} else if (error.path === "courseId") {
						hasCourseIdError = true;
						setCourseIdError(error.msg);
					}
				});

				if (!hasNameError) {
					setNameError("");
				}
				if (!hasLinkError) {
					setLinkError("");
				}
				if (!hasUserIdError) {
					setUserIdError("");
				}
				if (!hasSpecialtyIdError) {
					setSpecialtyIdError("");
				}
				if (!hasCourseIdError) {
					setCourseIdError("");
				}
			} else {
				alert("Помилка при створенні заняття!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Додати заняття"}
			name={"Додати"}
			onSubmit={handleSubmit}
		>
			{nameError && <p className={styles.errorMessage}>{nameError}</p>}
			<input
				placeholder="Введіть назву заняття..."
				className={styles.control}
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					setNameError("");
				}}
			/>
			{linkError && <p className={styles.errorMessage}>{linkError}</p>}
			<input
				placeholder="Введіть посилання силабус..."
				className={styles.control}
				type="text"
				value={annotationLink}
				onChange={(e) => {
					setLink(e.target.value);
					setLinkError("");
				}}
			/>
			{userIdError && <p className={styles.errorMessage}>{userIdError}</p>}
			<select
				className={style.dataBase}
				onChange={(e) => {
					setUserId(e.target.value);
					setUserIdError("");
				}}
			>
				<option>Вибрати користувача</option>
				{user.users.map((user) => (
					<option key={user.id} value={user.id}>
						{user.fullName}
					</option>
				))}
			</select>
			{specialtyIdError && (
				<p className={styles.errorMessage}>{specialtyIdError}</p>
			)}
			<select
				className={style.dataBase}
				onChange={(e) => {
					setSpecialtyId(e.target.value);
					setSpecialtyIdError("");
				}}
			>
				<option>Вибрати спеціальність</option>
				{specialty.specialties.map((specialty) => (
					<option key={specialty.id} value={specialty.id}>
						{specialty.name}
					</option>
				))}
			</select>
			{courseIdError && <p className={styles.errorMessage}>{courseIdError}</p>}
			<select
				className={style.dataBase}
				onChange={(e) => {
					setCourseId(e.target.value);
					setCourseIdError("");
				}}
			>
				<option>Вибрати курс</option>
				{course.courses.map((course) => (
					<option key={course.id} value={course.id}>
						{course.number}
					</option>
				))}
			</select>
		</Modal>
	);
};

export default CreateLesson;
