import React, { useContext } from "react";
import { Context } from "..";
import MaterialItem from "./MaterialItem";
import "../styles/list.css";
import { observer } from "mobx-react-lite";

const MaterialList = ({ selectedTypes, lessonId }) => {
	const { material } = useContext(Context);

	const filteredMaterials = material.materials.filter((material) => {
		return (
			(selectedTypes.length === 0 || selectedTypes.includes(material.typeId)) &&
			material.lessonId === parseInt(lessonId)
		);
	});

	return (
		<div className="grid">
			{filteredMaterials.map((material) => (
				<MaterialItem key={material.id} material={material} />
			))}
		</div>
	);
};

export default observer(MaterialList);
