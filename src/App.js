import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Context } from ".";
import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import style from "./styles/loading.module.css";

const App = () => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState("");
	const [id, setId] = useState("");

	useEffect(() => {
		check()
			.then((data) => {
				user.setUser(true);
				user.setIsAuth(true);
				setRole(data.role);
				setId(data.id);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className={style.loaderContainer}>
				<div className={style.spinner}></div>
			</div>
		);
	}

	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
		>
			<BrowserRouter>
				<Navbar role={role} id={id} />
				<AppRouter role={role} id={id} />
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default observer(App);
