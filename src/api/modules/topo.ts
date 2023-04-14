import http from "@/api";
import { form } from "../interface/form";
export const AddHost = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/addhost/${params.name}/${params.ip}/${params.switchName}`);
};
export const DelHost = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/deletehost/${params.name}`);
};
export const AddLink = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/addlink/${params.host_1_Name}/${params.host_2_Name}`, params);
};
export const DelLink = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/dellink/${params.host_1_Name}/${params.host_2_Name}`, params);
};
export const AddSwitch = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/addswitch/${params.name}`, params);
};
export const DelSwitch = (params: form) => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/deleteswitch/${params.name}`, params);
};
export const defaultTopo = () => {
	return http.get(`${import.meta.env.VITE_API_MININET_URL}/defaulttopo`);
};

export const getFlowTable = (params: { id: number }) => {
	return http.get(`${import.meta.env.VITE_API_RYU_URL}/stats/flow/${params.id}`);
};
export const getSwitchs = () => {
	return http.get(`${import.meta.env.VITE_API_RYU_URL}/stats/switches`);
};
export const clearFlowTable = (params: { id: number }) => {
	return http.delete(`${import.meta.env.VITE_API_RYU_URL}/stats/flowentry/clear/${params.id}`);
};
export const addFlowTable = (params: { flow: string }) => {
	return http.post(`${import.meta.env.VITE_API_RYU_URL}/stats/flowentry/add`, params);
};
