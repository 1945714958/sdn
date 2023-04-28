import http from "@/api";
import { form } from "../interface/form";
export const AddHost = (params: form) => {
	return http.get(`/topo/addhost/${params.name}/${params.ip}/${params.switchName}`);
};
export const DelHost = (params: form) => {
	return http.get(`/topo/deletehost/${params.name}`);
};
export const AddLink = (params: form) => {
	return http.get(`/topo/addlink/${params.host_1_Name}/${params.host_2_Name}`, params);
};
export const DelLink = (params: form) => {
	return http.get(`/topo/dellink/${params.host_1_Name}/${params.host_2_Name}`, params);
};
export const AddSwitch = (params: form) => {
	return http.get(`/topo/addswitch/${params.switchName}`, params);
};
export const DelSwitch = (params: form) => {
	return http.get(`/topo/deleteswitch/${params.switchName}`, params);
};
export const defaultTopo = () => {
	return http.get(`/topo/defaulttopo`);
};

export const getFlowTable = (params: { id: number }) => {
	return http.get(`/api/stats/flow/${params.id}`);
};

export const clearFlowTable = (params: { id: number }) => {
	return http.delete(`/api/stats/flowentry/clear/${params.id}`);
};
export const addFlowTable = (params: { flow: string }) => {
	return http.post(`/api/stats/flowentry/add`, params.flow as Object);
};
export const createTopo = () => {
	return http.get(`/topo/first_start`);
};

export const getSwitchs = () => {
	return http.get(`/topo/switches`);
};
export const getHost = () => {
	return http.get(`/topo/hosts`);
};

export const getLinks = () => {
	return http.get(`/topo/links`);
};
