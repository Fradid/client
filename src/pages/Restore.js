import React, { useState } from "react";
import style from "../styles/auth.module.css";
import Container from "../components/Container";
import { forgot } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const Restore = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [emailError, setEmailError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await forgot(email);
			navigate(LOGIN_ROUTE);
		} catch (error) {
			if (!error.response.data.message.errors) {
				alert(error.response.data.message);
			}
			if (Array.isArray(error.response.data.message.errors.errors)) {
				let hasEmailError = false;

				error.response.data.message.errors.errors.forEach((error) => {
					if (error.path === "email") {
						hasEmailError = true;
						setEmailError(error.msg);
					}
				});

				if (!hasEmailError) {
					setEmailError("");
				}
			} else {
				alert("Помилка при відправці пароля");
			}
		}
	};

	return (
		<Container style={{ justifyContent: "center", marginTop: "auto" }}>
			<div className={style.form}>
				<p className={style.article}>Відновлення паролю</p>
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
					<button className={`${style.button} ${style.btn}`}>Відновити</button>
				</form>
			</div>
		</Container>
	);
};

export default Restore;
