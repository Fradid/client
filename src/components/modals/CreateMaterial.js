import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createMaterial } from "../../http/materialAPI";
import styles from "../../styles/auth.module.css";
import style from "../../styles/adminpanel.module.css";

const CreateMaterial = ({ setIsOpen, id }) => {
	const { type } = useContext(Context);
	const [name, setName] = useState("");
	const [lessonId, setLessonId] = useState(id);
	const [typeId, setTypeId] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [presLink, setPresLink] = useState("");
	const [docLink, setDocLink] = useState("");
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
			await createMaterial(formData);
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
				alert("Помилка при створенні матеріалу!");
			}
		}
	};

	const handleTypeChange = (e) => {
		setTypeId(e.target.value);
		setTypeIdError("");
	};

	const handleVideoLinkChange = (e) => {
		setVideoLink(e.target.value);
	};

	const handlePresLinkChange = (e) => {
		setPresLink(e.target.value);
	};

	const handleDocLinkChange = (e) => {
		setDocLink(e.target.value);
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
			title={"Додати матеріал"}
			name={"Додати"}
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
				defaultValue=""
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
				required
				value={typeId === 4 ? videoLink : typeId === 5 ? presLink : docLink}
				onChange={
					typeId === 4
						? handleVideoLinkChange
						: typeId === 5
						? handlePresLinkChange
						: handleDocLinkChange
				}
			/>
		</Modal>
	);
};

export default observer(CreateMaterial);
