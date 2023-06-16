import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";
import Dropdown from "./Dropdown";
import { ADMIN_ROUTE, LOGIN_ROUTE, USER_ROUTE } from "../utils/consts";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import logoImg from "../assets/cropped-logo.png";

function Navbar({ role, id }) {
	const { user } = useContext(Context);

	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const onMouseEnter = () => {
		if (window.innerWidth < 960) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

	const onMouseLeave = () => {
		if (window.innerWidth < 960) {
			setDropdown(false);
		} else {
			setDropdown(false);
		}
	};

	const setTheme = (themeName) => {
		localStorage.setItem("theme", themeName);
		document.documentElement.className = themeName;
	};

	const toggleTheme = () => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setTheme("theme-light");
		} else {
			setTheme("theme-dark");
		}
	};

	useEffect(() => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setTheme("theme-dark");
			document.getElementById("slider").checked = false;
		} else {
			setTheme("theme-light");
			document.getElementById("slider").checked = true;
		}
	}, []);

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
			<nav className={style.navbar}>
				<img src={logoImg} className={style.image} alt="Logo" />
				<Link to="/" className={style.navbarLogo} onClick={closeMobileMenu}>
					Навчально-методичні матеріали
				</Link>
				<div className={style.menuIcon} onClick={handleClick}>
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
				</div>
				<ul
					className={click ? `${style.navMenu} ${style.active}` : style.navMenu}
				>
					<li className={style.navItem}>
						<label id="switch" className={style.switch}>
							<input type="checkbox" onChange={toggleTheme} id="slider" />
							<span className={`${style.slider} ${style.round}`}></span>
						</label>
					</li>
					<li
						className={style.navItem}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						{role === "ADMIN" ? (
							<Link
								to={ADMIN_ROUTE}
								className={style.navLinks}
								onClick={closeMobileMenu}
							>
								Особистий кабінет <span className="fas fa-angle-down" />
							</Link>
						) : (
							<Link
								to={user.isAuth ? `${USER_ROUTE}/${id}` : LOGIN_ROUTE}
								className={style.navLinks}
								onClick={closeMobileMenu}
							>
								Особистий кабінет <span className="fas fa-angle-down" />
							</Link>
						)}
						{dropdown && <Dropdown role={role} id={id} />}
					</li>
					{user.isAuth && (
						<li className={style.navItem}>
							<button
								className={`${style.button} ${style.btn}`}
								onClick={() => logOut()}
							>
								Вийти
							</button>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
}

export default observer(Navbar);
