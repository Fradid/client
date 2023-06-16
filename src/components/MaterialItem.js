import React from "react";
import "../styles/item.css";
import { MATERIAL_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const MaterialItem = ({ material }) => {
	const navigate = useNavigate();

	const handleMaterialClick = () => {
		navigate(`${MATERIAL_ROUTE}/${material.id}`);
	};
	return (
		<div className="buttonGr name" onClick={handleMaterialClick}>
			<p>{material.name}</p>
		</div>
	);
};

export default MaterialItem;
