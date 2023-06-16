import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import LessonPage from "./pages/LessonPage";
import Main from "./pages/Main";
import MaterialPage from "./pages/MaterialPage";
import Restore from "./pages/Restore";
import UserPage from "./pages/UserPage";
import {
	ADMIN_ROUTE,
	LESSON_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	MATERIAL_ROUTE,
	RESTORE_ROUTE,
	USER_ROUTE,
} from "./utils/consts";

export const authRoutes = [
	{
		title: "Адмін панель",
		path: ADMIN_ROUTE,
		Component: Admin,
		cName: "dropdown-link",
		routeRole: "ADMIN"
	},
	{
		title: "Профіль",
		path: USER_ROUTE + "/:id", //
		Component: UserPage,
		cName: "dropdown-link",
		routeRole: "TEACHER"
	},
];

export const publicRoutes = [
	{
		path: LESSON_ROUTE + "/:id", //  + '/:id' потом добавить
		Component: LessonPage,
	},
	{
		title: "Увійти",
		path: LOGIN_ROUTE,
		Component: Auth,
		cName: "dropdown-link",
	},
	{
		title: "Відновити пароль",
		path: RESTORE_ROUTE,
		Component: Restore,
		cName: "dropdown-link",
	},
	{
		path: MATERIAL_ROUTE + "/:id", //  + '/:id' потом добавить
		Component: MaterialPage,
	},
	{
		path: MAIN_ROUTE,
		Component: Main,
	},
];
