import { $authHost, $host } from "./index";

export const createMaterial = async (material) => {
	const { data } = await $authHost.post("/api/material", material);
	return data;
};

export const fetchMaterials = async (lessonId, typeId, limit = 2, page) => {
	const { data } = await $host.get("/api/material", {
		params: {
			lessonId,
			typeId,
			limit,
			page,
		},
	});
	return data;
};

export const fetchOneMaterial = async (id) => {
	const { data } = await $host.get(`/api/material/${id}`);
	return data;
};

export const editMaterial = async (id, material) => {
	const { data } = await $authHost.put(`/api/material/${id}`, material);
	return data;
};

export const deleteMaterial = async (id) => {
	const { data } = await $authHost.delete(`/api/material/${id}`);
	return data;
};
