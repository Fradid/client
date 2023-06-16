import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import style from "../styles/material.module.css";
import { fetchOneMaterial } from "../http/materialAPI";

const MaterialPage = () => {
	const { id } = useParams();
	const [material, setMaterial] = useState({ info: {} });

	useEffect(() => {
		fetchOneMaterial(id).then((data) => setMaterial(data));
	}, []);

	return (
		<Container>
			<Container
				style={{ flexDirection: "column", alignItems: "center", width: "100%" }}
			>
				<h1>{material ? material.name : "Material not found"}</h1>
				{material.info.docLink && (
					<iframe
						className={style.viewer}
						title={material ? material.name : "Material not found"}
						src={material.info.docLink}
					></iframe>
				)}
				{material.info.videoLink && (
					<iframe
						className={style.viewer}
						title={material ? material.name : "Material not found"}
						src={material.info.videoLink}
						allow="autoplay"
					></iframe>
				)}
				{material.info.pressLink && (
					<iframe
						className={style.viewer}
						title={material ? material.name : "Material not found"}
						src={material.info.pressLink}
						allowfullscreen="true"
						mozallowfullscreen="true"
						webkitallowfullscreen="true"
						frameborder="0"
					></iframe>
				)}
				{!material.info.docLink &&
					!material.info.videoLink &&
					!material.info.pressLink && <p>Інформація відсутня в базі даних</p>}
			</Container>
		</Container>
	);
};

export default MaterialPage;
