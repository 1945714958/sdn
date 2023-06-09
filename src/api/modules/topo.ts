import http from "@/api";
import { form } from "../interface/form";
export const AddHost = (params: form) => {
	return http.get(`/topo/addhost/${params.name}`);
};
export const DelHost = (params: form) => {
	return http.get(`/topo/delhost/${params.name}`);
};
export const AddLink = (params: form) => {
	return http.get(`/topo/addlink/${params.Name1}/${params.Name2}`);
};
export const DelLink = (params: form) => {
	return http.get(`/topo/dellink/${params.Name1}/${params.Name2}`);
};
export const AddSwitch = (params: form) => {
	return http.get(`/topo/addswitch/${params.switchName}`);
};
export const DelSwitch = (params: form) => {
	return http.get(`/topo/delswitch/${params.switchName}`);
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
export const sdpTopo = () => {
	return http.get(`/topo/sdp_topo`);
};
export const firstStart = () => {
	return http.get(`/topo/firststart`);
};
export const server = () => {
	return http.get(`/topo/server`);
};
export const client = host => {
	return http.get(`/topo/server/${host}`);
};
