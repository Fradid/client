import React, { useContext } from "react";
import style from "../../styles/adminpanel.module.css";
import { Context } from "../..";
import { deleteType } from "../../http/typeAPI";

const TypesDB = ({ query }) => {
	const { type } = useContext(Context);

	const handleDeleteType = (id) => {
		deleteType(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні типа з БД!");
			});
	};

	const filteredTypes = type.types.filter((type) => {
		return type.name.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			{filteredTypes.map((type) => (
				<li key={type.id}>
					<p>{type.name}</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={type.id}
						onClick={() => handleDeleteType(type.id)}
					>
						Видалити
					</button>
				</li>
			))}
		</>
	);
};

export default TypesDB;
