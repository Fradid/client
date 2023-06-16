import React, { useState } from "react";
import Modal from "../Modal";
import { createSpecialty } from "../../http/specialtyAPI";
import style from "../../styles/auth.module.css";

const CreateSpecialty = ({ setIsOpen }) => {
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const handleSubmit = async () => {
		try {
			await createSpecialty(name);
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
				alert("Помилка при створенні спеціальності!");
			}
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Додати спеціальність"}
			name={"Додати"}
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

export default CreateSpecialty;
