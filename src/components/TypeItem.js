import React from "react";
import style from "../styles/filter.module.css";

const TypeItem = ({ type, handleTypeChange }) => {
	// const [selectedTypes, setSelectedTypes] = useState("");

	// const handleTypeChange = (event) => {
	// 	const type = Number(event.target.value);
	// 	setSelectedTypes((selectedTypes) => {
	// 		if (selectedTypes.includes(type)) {
	// 			return selectedTypes.filter((t) => t !== type);
	// 		} else {
	// 			return [...selectedTypes, type];
	// 		}
	// 	});
	// };

	return (
		<li className={style.inptlist}>
			<label className={style.inputs}>
				<input
					type="checkbox"
					value={type.id}
					checked={type.isChecked}
					onChange={() => handleTypeChange(type.id)}
				/>
				<span className={style.name}>{type.name}</span>
			</label>
		</li>
	);
};

export default TypeItem;
