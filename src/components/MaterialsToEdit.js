import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import MaterialsDB from "./lists/MaterialsDB";
import style from "../styles/adminpanel.module.css";
import Search from "./Search";
import { fetchMaterials } from "../http/materialAPI";
import { observer } from "mobx-react-lite";

const MaterialsToEdit = ({ id }) => {
	const { type, material } = useContext(Context);
	const [selectedType, setSelectedType] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {
		fetchMaterials(id, selectedType, null, 1).then((data) => {
			material.setMaterials(data.rows);
		});
	}, [id, selectedType]);

	const handleTypeChange = (event) => {
		setSelectedType(event.target.value);
	};

	return (
		<>
			<div>
				<select
					className={`${style.dataBase} ${style.wid}`}
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
			</div>
			<Search setSearchQuery={setQuery} />
			<div className={style.sorted}>
				{selectedType === "" || selectedType === "Вибрати тип матеріалу" ? (
					<h1 className={style.attention}>Виберіть тип матеріалу</h1>
				) : (
					<ul className={style.name}>{<MaterialsDB query={query} />}</ul>
				)}
			</div>
		</>
	);
};

export default observer(MaterialsToEdit);
