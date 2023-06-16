import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { Context } from "../..";
import style from "../../styles/adminpanel.module.css";
import { editLesson } from "../../http/lessonAPI";
import styles from "../../styles/auth.module.css";

const EditLesson = ({ lesson, setIsOpen }) => {
	const { user, specialty, course } = useContext(Context);
	const [name, setName] = useState(lesson.name);
	const [annotationLink, setLink] = useState(lesson.annotationLink);
	const [userId, setUserId] = useState(lesson.userId);
	const [specialtyId, setSpecialtyId] = useState(lesson.specialtyId);
	const [courseId, setCourseId] = useState(lesson.courseId);
	const [nameError, setNameError] = useState("");
	const [linkError, setLinkError] = useState("");
	const [userIdError, setUserIdError] = useState("");
	const [specialtyIdError, setSpecialtyIdError] = useState("");
	const [courseIdError, setCourseIdError] = useState("");

	const handleSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("annotationLink", annotationLink);
			formData.append("userId", userId);
			formData.append("specialtyId", specialtyId);
			formData.append("courseId", courseId);

			await editLesson(lesson.id, formData);
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
				alert("Помилка при редагуванні заняття!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Редагувати заняття"}
			name={"Змінити"}
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
				defaultValue={userId}
			>
				<option value="">Вибрати користувача</option>
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
				defaultValue={specialtyId}
			>
				<option value="">Вибрати спеціальність</option>
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
				defaultValue={courseId}
			>
				<option value="">Вибрати курс</option>
				{course.courses.map((course) => (
					<option key={course.id} value={course.id}>
						{course.number}
					</option>
				))}
			</select>
		</Modal>
	);
};

export default EditLesson;
