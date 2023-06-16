import React, { useContext, useState } from "react";
import style from "../../styles/adminpanel.module.css";
import { Context } from "../..";
import { deleteSpecialty } from "../../http/specialtyAPI";
import EditSpecialty from "../modals/EditSpecialty";

const SpecialtiesDB = ({ query }) => {
	const { specialty } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const [specialtyToEdit, setSpecialtyToEdit] = useState(null);

	const handleDeleteSpecialty = (id) => {
		deleteSpecialty(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні спеціальності з БД!");
			});
	};

	const handleEditSpecialty = (specialty) => {
		setSpecialtyToEdit(specialty);
		setIsOpen(true);
	};

	const filteredSpecialties = specialty.specialties.filter((specialty) => {
		return specialty.name.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			{filteredSpecialties.map((specialty) => (
				<li key={specialty.id}>
					<p
						onClick={() => handleEditSpecialty(specialty)}
						className={style.edit}
					>
						{specialty.name}
					</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={specialty.id}
						onClick={() => handleDeleteSpecialty(specialty.id)}
					>
						Видалити
					</button>
				</li>
			))}
			{specialtyToEdit && isOpen && (
				<EditSpecialty specialty={specialtyToEdit} setIsOpen={setIsOpen} />
			)}
		</>
	);
};

export default SpecialtiesDB;
