import React, { useContext, useState } from "react";
import { Context } from "../..";
import style from "../../styles/adminpanel.module.css";
import styles from "../../styles/auth.module.css";
import { editMaterial } from "../../http/materialAPI";
import Modal from "../Modal";

const EditMaterial = ({ setIsOpen, material }) => {
	const { type } = useContext(Context);
	const [name, setName] = useState(material.name);
	const [lessonId, setLessonId] = useState(material.lessonId);
	const [typeId, setTypeId] = useState(material.typeId);
	const [videoLink, setVideoLink] = useState(material.info.videoLink || "");
	const [presLink, setPresLink] = useState(material.info.presLink || "");
	const [docLink, setDocLink] = useState(material.info.docLink || "");
	const [nameError, setNameError] = useState("");
	const [typeIdError, setTypeIdError] = useState("");

	const handleSubmit = async () => {
		try {
			const info = JSON.stringify({
				videoLink: videoLink,
				presLink: presLink,
				docLink: docLink,
			});

			const formData = new FormData();
			formData.append("name", name);
			formData.append("lessonId", lessonId);
			formData.append("typeId", typeId);
			formData.append("info", info);
			await editMaterial(material.id, formData);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasNameError = false;
				let hasTypeIdError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "name") {
						hasNameError = true;
						setNameError(error.msg);
					} else if (error.path === "typeId") {
						hasTypeIdError = true;
						setTypeIdError(error.msg);
					}
				});

				if (!hasNameError) {
					setNameError("");
				}
				if (!hasTypeIdError) {
					setTypeIdError("");
				}
			} else {
				alert("Помилка при редагуванні матеріалу!");
			}
		}
	};

	const handleTypeChange = (e) => {
		setTypeId(e.target.value);
		setTypeIdError("");
	};

	const getInputPlaceholder = () => {
		if (typeId === "4") {
			return "Введіть покликання на відеоматеріал...";
		} else if (typeId === "5") {
			return "Введіть покликання на презентацію...";
		} else {
			return "Введіть покликання на документ...";
		}
	};

	return (
		<Modal
			setIsOpen={setIsOpen}
			title={"Редагувати матеріал"}
			name={"Змінити"}
			onSubmit={handleSubmit}
		>
			{nameError && <p className={styles.errorMessage}>{nameError}</p>}
			<input
				placeholder="Введіть назву матеріалу..."
				className={styles.control}
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					setNameError("");
				}}
			/>
			{typeIdError && <p className={styles.errorMessage}>{typeIdError}</p>}
			<select
				className={style.dataBase}
				onChange={handleTypeChange}
				defaultValue={typeId}
			>
				<option value="">Вибрати тип матеріалу</option>
				{type.types.map((type) => (
					<option key={type.id} value={type.id}>
						{type.name}
					</option>
				))}
			</select>
			<input
				placeholder={getInputPlaceholder()}
				className={styles.control}
				type="url"
				value={typeId === 4 ? videoLink : typeId === 5 ? presLink : docLink}
				onChange={(e) => {
					typeId === 4
						? setVideoLink(e.target.value)
						: typeId === 5
						? setPresLink(e.target.value)
						: setDocLink(e.target.value);
				}}
			/>
		</Modal>
	);
};

export default EditMaterial;
