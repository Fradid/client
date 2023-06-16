import React, { useContext } from "react";
import style from "../styles/filter.module.css";
import { Context } from "..";
import SpecialtyItem from "./SpecialtyItem";
import { observer } from "mobx-react-lite";

const SpecialtyList = ({ handleSpecialtyChange }) => {
	const { specialty } = useContext(Context);

	return (
		<ul className={style.content}>
			{specialty.specialties.map((specialty) => (
				<SpecialtyItem
					key={specialty.id}
					specialty={specialty}
					handleSpecialtyChange={handleSpecialtyChange}
				/>
			))}
		</ul>
	);
};

export default observer(SpecialtyList);
