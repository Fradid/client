import { $authHost, $host } from "./index";

export const createCourse = async (number) => {
	const { data } = await $authHost.post("/api/course", { number });
	return data;
};

export const fetchCourses = async () => {
	const { data } = await $host.get("/api/course");
	return data;
};

export const deleteCourse = async (id) => {
	const { data } = await $authHost.delete(`/api/course/${id}`);
	return data;
};
