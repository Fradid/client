import React, { useContext, useState } from "react";
import style from "../styles/auth.module.css";
import Container from "../components/Container";
import { login } from "../http/userAPI";
import { Context } from "..";
import { Link, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, RESTORE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let data;

		try {
			data = await login(email, password);
			user.setUser(data);
			user.setIsAuth(true);
			navigate(MAIN_ROUTE);
			window.location.reload();
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasEmailError = false;
				let hasPasswordError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "email") {
						hasEmailError = true;
						setEmailError(error.msg);
					} else if (error.path === "password") {
						hasPasswordError = true;
						setPasswordError(error.msg);
					}
				});

				if (!hasEmailError) {
					setEmailError("");
				}
				if (!hasPasswordError) {
					setPasswordError("");
				}
			} else {
				alert("Помилка входу!");
			}
		}
	};

	return (
		<Container style={{ justifyContent: "center", marginTop: "auto" }}>
			<div className={style.form}>
				<p className={style.article}>Авторизація</p>
				<form className={style.forms} onSubmit={handleSubmit}>
					<input
						placeholder="Введіть вашу електронну пошту..."
						className={style.control}
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setEmailError("");
						}}
					/>
					{emailError && <p className={style.errorMessage}>{emailError}</p>}
					<input
						placeholder="Введіть ваш пароль..."
						className={style.control}
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setPasswordError("");
						}}
					/>
					{passwordError && (
						<p className={style.errorMessage}>{passwordError}</p>
					)}
					<p className={style.alert}>
						Забули пароль?{" "}
						<Link to={RESTORE_ROUTE} className={style.link}>
							Відновити
						</Link>
					</p>
					<button className={`${style.button} ${style.btn}`} type="submit">
						Увійти
					</button>
				</form>
			</div>
		</Container>
	);
};

export default observer(Auth);
