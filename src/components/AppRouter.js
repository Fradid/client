import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { ADMIN_ROUTE, MAIN_ROUTE, USER_ROUTE } from "../utils/consts";
import { Context } from "../index";

const AppRouter = ({ role, id }) => {
	const { user } = useContext(Context);

	return (
		<Routes>
			{authRoutes.map(({ path, Component }) => {
				if (role === "TEACHER" && path === ADMIN_ROUTE) {
					return null;
				} else if (role === "ADMIN" && path.startsWith(USER_ROUTE)) {
					return null;
				}

				return (
					<Route
						key={path}
						path={path}
						element={
							user.isAuth ? <Component /> : <Navigate to="/login" replace />
						}
					/>
				);
			})}

			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component userId={id} />} />
			))}
			<Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
		</Routes>
	);
};

export default AppRouter;
