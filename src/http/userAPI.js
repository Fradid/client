import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (user) => {
	const { data } = await $authHost.post("/api/user/register", user);
	return data;
};

export const login = async (email, password) => {
	const { data } = await $host.post("/api/user/login", { email, password });
	localStorage.setItem("token", data.token);
	return jwt_decode(data.token);
};

export const check = async () => {
	const { data } = await $authHost.get("/api/user/auth");
	localStorage.setItem("token", data.token);
	return jwt_decode(data.token);
};

export const forgot = async (email) => {
	const response = await $host.post("/api/user/forgot", { email });
	return response;
};

export const fetchUsers = async () => {
	const { data } = await $authHost.get("/api/user");
	return data;
};

export const fetchOneUser = async (id) => {
	const { data } = await $authHost.get(`/api/user/${id}`);
	return data;
};

export const editUser = async (id, user) => {
	const { data } = await $authHost.put(`/api/user/${id}`, user);
	return data;
};

export const deleteUser = async (id) => {
	const { data } = await $authHost.delete(`/api/user/${id}`);
	return data;
};
