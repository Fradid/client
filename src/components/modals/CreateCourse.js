import React, { useState } from "react";
import Modal from "../Modal";
import { createCourse } from "../../http/courseAPI";
import style from "../../styles/auth.module.css";

const CreateCourse = ({ setIsOpen }) => {
	const [number, setNumber] = useState("");
	const [numberError, setNumberError] = useState("");

	const handleSubmit = async () => {
		try {
			await createCourse(number);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasNumberError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "number") {
						hasNumberError = true;
						setNumberError(error.msg);
					}
				});

				if (!hasNumberError) {
					setNumberError("");
				}
			} else {
				alert("Помилка при створенні курсу!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Додати курс"}
			name={"Додати"}
			onSubmit={handleSubmit}
		>
			{numberError && <p className={style.errorMessage}>{numberError}</p>}
			<input
				placeholder="Введіть номер курсу..."
				className={style.control}
				type="text"
				value={number}
				onChange={(e) => {
					setNumber(e.target.value);
					setNumberError("");
				}}
			/>
		</Modal>
	);
};

export default CreateCourse;
