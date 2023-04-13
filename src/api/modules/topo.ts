import http from "@/api";
import.meta.env.VITE_API_URL;

export const getUserList = (params: Object) => {
	return http.get(`${import.meta.env.VITE_API_RYU_URL}/addhost`, params);
};
