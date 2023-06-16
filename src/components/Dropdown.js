import React, { useContext, useState } from "react";
import "../styles/dropdown.css";
import { publicRoutes, authRoutes } from "../routes";
import { Link } from "react-router-dom";
import { Context } from "../index";
import { MAIN_ROUTE, USER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Dropdown = ({ role, id }) => {
	const [click, setClick] = useState(false);
	const { user } = useContext(Context);
	const routes = user.isAuth
		? authRoutes.filter((route) => route.routeRole === role)
		: publicRoutes;

	const handleClick = () => setClick(!click);

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
			<ul
				onClick={handleClick}
				className={click ? "dropdown-menu clicked" : "dropdown-menu"}
			>
				{routes.map((item, index) => {
					return (
						<li key={index}>
							<Link
								className={item.cName}
								to={
									item.path === "/user/:id" ? `${USER_ROUTE}/${id}` : item.path
								}
								onClick={() => setClick(false)}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
				{user.isAuth && (
					<li>
						<Link
							className="dropdown-link"
							to={MAIN_ROUTE}
							onClick={() => logOut()}
						>
							Вийти
						</Link>
					</li>
				)}
			</ul>
		</>
	);
};

export default observer(Dropdown);
