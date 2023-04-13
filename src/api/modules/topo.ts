import http from "@/api";

export const getUserList = (params: string) => {
	return http.get(`/user/list`, params);
};
