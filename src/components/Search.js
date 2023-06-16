import React, { useCallback } from "react";
import debounce from "lodash.debounce";
import style from "../styles/search.module.css";

const Search = ({ setSearchQuery }) => {
	const delayedQuery = useCallback(
		debounce((q) => setSearchQuery(q), 500),
		[setSearchQuery]
	);

	const handleInputChange = (e) => {
		const query = e.target.value;
		delayedQuery(query);
	};

	return (
		<div className={style.searchbar}>
			<input
				type="text"
				placeholder="Пошук..."
				className={style.search}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default Search;
