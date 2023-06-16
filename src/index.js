import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import LessonStore from "./store/LessonStore";
import MaterialStore from "./store/MaterialStore";
import TypeStore from "./store/TypeStore";
import SpecialtyStore from "./store/SpecialtyStore";
import CourseStore from "./store/CourseStore";
import "./styles/index.css";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Context.Provider
		value={{
			user: new UserStore(),
			lesson: new LessonStore(),
			material: new MaterialStore(),
			type: new TypeStore(),
			specialty: new SpecialtyStore(),
			course: new CourseStore(),
		}}
	>
		<App />
	</Context.Provider>
);
