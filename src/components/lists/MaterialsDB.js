import React, { useContext, useState } from "react";
import { deleteMaterial } from "../../http/materialAPI";
import EditMaterial from "../modals/EditMaterial";
import { Context } from "../..";
import style from "../../styles/adminpanel.module.css";
import { observer } from "mobx-react-lite";

const MaterialsDB = ({ query }) => {
	const { material } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const [materialToEdit, setMaterialToEdit] = useState(null);

	const handleDeleteMaterial = (id) => {
		deleteMaterial(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні матеріалу з БД!");
			});
	};

	const handleEditMaterial = (material) => {
		setMaterialToEdit(material);
		setIsOpen(true);
	};

	const filteredMaterials = material.materials.filter((material) => {
		return material.name.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			{filteredMaterials.map((material) => (
				<li key={material.id}>
					<p
						onClick={() => handleEditMaterial(material)}
						className={style.edit}
					>
						{material.name}
					</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={material.id}
						onClick={() => handleDeleteMaterial(material.id)}
					>
						Видалити
					</button>
				</li>
			))}
			{materialToEdit && isOpen && (
				<EditMaterial material={materialToEdit} setIsOpen={setIsOpen} />
			)}
		</>
	);
};

export default observer(MaterialsDB);
