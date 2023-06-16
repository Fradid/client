import { $authHost, $host } from "./index";

export const createLesson = async (
	name,
	annotationLink,
	userId,
	specialtyId,
	courseId
) => {
	const { data } = await $authHost.post("/api/lesson", {
		name,
		annotationLink,
		userId,
		specialtyId,
		courseId,
	});
	return data;
};

export const fetchLessons = async (
	userId,
	specialtyId,
	courseId,
	limit = 2,
	page
) => {
	const { data } = await $host.get("/api/lesson", {
		params: {
			userId,
			specialtyId,
			courseId,
			limit,
			page,
		},
	});
	return data;
};

export const fetchOneLesson = async (id) => {
	const { data } = await $host.get(`/api/lesson/${id}`);
	return data;
};

export const editLesson = async (id, lesson) => {
	const { data } = await $authHost.put(`/api/lesson/${id}`, lesson);
	return data;
};

export const deleteLesson = async (id) => {
	const { data } = await $authHost.delete(`/api/lesson/${id}`);
	return data;
};
