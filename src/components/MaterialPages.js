import React, { useContext } from "react";
import { Context } from "..";
import style from "../styles/pagination.module.css";
import { observer } from "mobx-react-lite";

const MaterialPages = () => {
	const { material } = useContext(Context);
	const pageCount = Math.ceil(material.totalCount / material.limit);
	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	const goToPreviousPage = () => {
		if (material.page > 1) {
			material.setPage(material.page - 1);
		}
	};

	const goToNextPage = () => {
		if (material.page < pageCount) {
			material.setPage(material.page + 1);
		}
	};

	return (
		<div className={style.pagination}>
			<p onClick={goToPreviousPage}>
				<i className="fa-solid fa-chevron-left"></i>
			</p>
			{pages.map((page) => (
				<p
					key={page}
					className={material.page === page ? style.active : ""}
					onClick={() => material.setPage(page)}
				>
					{page}
				</p>
			))}
			<p onClick={goToNextPage}>
				<i className="fa-solid fa-chevron-right"></i>
			</p>
		</div>
	);
};

export default observer(MaterialPages);
