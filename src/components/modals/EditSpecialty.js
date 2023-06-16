import React, { useState } from "react";
import { editSpecialty } from "../../http/specialtyAPI";
import Modal from "../Modal";
import style from "../../styles/auth.module.css";

const EditSpecialty = ({ setIsOpen, specialty }) => {
	const [name, setName] = useState(specialty.name);
	const [nameError, setNameError] = useState("");

	const handleSubmit = async () => {
		try {
			await editSpecialty(specialty.id, name);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasNameError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "name") {
						hasNameError = true;
						setNameError(error.msg);
					}
				});

				if (!hasNameError) {
					setNameError("");
				}
			} else {
				alert("Помилка при редагуванні спеціальності!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Редагувати спеціальність"}
			name={"Змінити"}
			onSubmit={handleSubmit}
		>
			{nameError && <p className={style.errorMessage}>{nameError}</p>}
			<input
				placeholder="Введіть назву спеціальності..."
				className={style.control}
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					setNameError("");
				}}
			/>
		</Modal>
	);
};

export default EditSpecialty;
