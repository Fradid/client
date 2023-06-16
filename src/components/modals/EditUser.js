import React, { useState } from "react";
import Modal from "../Modal";
import { editUser } from "../../http/userAPI";
import style from "../../styles/auth.module.css";

const EditUser = ({ setIsOpen, user }) => {
	const [fullName, setFullName] = useState(user.fullName);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const [image, setImage] = useState(user.image);
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append("fullName", fullName);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("image", image);

			await editUser(user.id, formData);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasNameError = false;
				let hasEmailError = false;
				let hasPasswordError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "fullName") {
						hasNameError = true;
						setNameError(error.msg);
					} else if (error.path === "email") {
						hasEmailError = true;
						setEmailError(error.msg);
					} else if (error.path === "password") {
						hasPasswordError = true;
						setPasswordError(error.msg);
					}
				});

				if (!hasNameError) {
					setNameError("");
				}
				if (!hasEmailError) {
					setEmailError("");
				}
				if (!hasPasswordError) {
					setPasswordError("");
				}
			} else {
				alert("Помилка при редагуванні даних користувача!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Редагувати дані користувача"}
			name={"Зберегти"}
			onSubmit={handleSubmit}
		>
			{nameError && <p className={style.errorMessage}>{nameError}</p>}
			<input
				placeholder="Введіть ПІБ користувача..."
				className={style.control}
				type="text"
				value={fullName}
				onChange={(e) => {
					setFullName(e.target.value);
					setNameError("");
				}}
			/>
			{emailError && <p className={style.errorMessage}>{emailError}</p>}
			<input
				placeholder="Введіть електронну пошту..."
				className={style.control}
				type="text"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					setEmailError("");
				}}
			/>
			{passwordError && <p className={style.errorMessage}>{passwordError}</p>}
			<input
				placeholder="Введіть пароль..."
				className={style.control}
				type="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					setPasswordError("");
				}}
			/>
			<input
				className={style.control}
				type="file"
				onChange={(e) => setImage(e.target.files[0])}
			/>
		</Modal>
	);
};

export default EditUser;
