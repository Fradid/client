import React, { useContext } from "react";
import style from "../styles/filter.module.css";
import { Context } from "..";
import TypeItem from "./TypeItem";
import { observer } from "mobx-react-lite";

const TypeList = ({ handleTypeChange }) => {
	const { type } = useContext(Context);

	return (
		<ul className={style.content}>
			{type.types.map((type) => (
				<TypeItem
					key={type.id}
					type={type}
					handleTypeChange={handleTypeChange}
				/>
			))}
		</ul>
	);
};

export default observer(TypeList);
