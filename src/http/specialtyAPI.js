import { $authHost, $host } from "./index";

export const createSpecialty = async (name) => {
	const { data } = await $authHost.post("/api/specialty", { name });
	return data;
};

export const fetchSpecialties = async () => {
	const { data } = await $host.get("/api/specialty");
	return data;
};

export const editSpecialty = async (id, name) => {
	const { data } = await $authHost.put(`/api/specialty/${id}`, { name });
	return data;
};

export const deleteSpecialty = async (id) => {
	const { data } = await $authHost.delete(`/api/specialty/${id}`);
	return data;
};
