import React from "react";
import style from "../styles/filter.module.css";

const SpecialtyItem = ({ specialty, handleSpecialtyChange }) => {
	// const [selectedSpecialties, setSelectedSpecialties] = useState([]);

	// const handleSpecialtyChange = (event) => {
	// 	const specialty = Number(event.target.value);
	// 	setSelectedSpecialties((selectedSpecialties) => {
	// 		if (selectedSpecialties.includes(specialty)) {
	// 			return selectedSpecialties.filter((s) => s !== specialty);
	// 		} else {
	// 			return [...selectedSpecialties, specialty];
	// 		}
	// 	});
	// };

	return (
		<li className={style.inptlist}>
			<label className={style.inputs}>
				<input
					type="checkbox"
					value={specialty.id}
					checked={specialty.isChecked}
					onChange={() => handleSpecialtyChange(specialty.id)}
				/>
				<span className={style.name}>{specialty.name}</span>
			</label>
		</li>
	);
};

export default SpecialtyItem;
