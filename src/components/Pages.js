import React, { useContext } from "react";
import style from "../styles/pagination.module.css";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Pages = () => {
	const { lesson } = useContext(Context);
	const pageCount = Math.ceil(lesson.totalCount / lesson.limit);
	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	const goToPreviousPage = () => {
		if (lesson.page > 1) {
			lesson.setPage(lesson.page - 1);
		}
	};

	const goToNextPage = () => {
		if (lesson.page < pageCount) {
			lesson.setPage(lesson.page + 1);
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
					className={lesson.page === page ? style.active : ""}
					onClick={() => lesson.setPage(page)}
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

export default observer(Pages);
