import { defineStore } from "pinia";
import { TopoState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { getHost, getSwitchs, getLinks, AddHost } from "@/api/modules/topo";
import { DataSet } from "vis-data/peer";
export const TopoStore = defineStore({
	id: "TopoStore",
	state: (): TopoState => ({
		editBool: false,
		nodes: new DataSet([]),
		edges: new DataSet([]),
		Hosts: {},
		Switches: {},
		Links: {},
		currentHost: null,
		currentSwitch: null,
		currentPort: null,
		currentLinks: []
	}),
	getters: {
		editBoolGet: state => state.editBool,
		HostsGet: state => state.Hosts,
		SwitchesGet: state => state.Switches,
		LinksGet: state => state.Links,
		currentHostGet: state => state.currentHost,
		currentSwitchGet: state => state.currentSwitch,
		currentPortGet: state => state.currentPort,
		NodesGet: state => state.nodes,
		EdgesGet: state => state.edges,
		CurLinksGet: state => state.currentLinks
	},
	actions: {
		ADDLINKS() {},
		ADDHOST(edges) {
			this.nodes.forEach(element => {
				if (element.id == edges.from && element.group == "switch") {
					const item = {
						name: this.currentHost.name,
						ip: this.currentHost.ip,
						switchName: element.name
					};
					AddHost(item);
				}
			});
		},
		async getAll(callback) {
			await Promise.all([getHost(), getSwitchs(), getLinks()]).then(values => {
				const results: any = values.map(item => {
					//使字面量可迭代
					item[Symbol.iterator] = function () {
						const keys = Object.keys(this);
						let index = 0;
						return {
							next() {
								return {
									value: item[keys[index++]],
									done: index > keys.length
								};
							}
						};
					};
					return item;
				});

				this.Hosts = results[0];
				this.Switches = results[1];
				this.Links = results[2];

				callback();
			});
		},
		setSwitch(item) {
			this.currentSwitch = item;
		},
		setHost(item) {
			this.currentHost = item;
		},
		setPort(item) {
			this.currentPort = item;
		},
		setNodes(Nodes) {
			this.nodes = Nodes;
		},
		setEdges(Edges) {
			this.edges = Edges;
		},
		addNodes(item) {
			this.nodes.add(item);
		},
		addEdges(item) {
			this.edges.add(item);
		},
		setEditBool(bool) {
			this.editBool = bool;
		},
		addCurEdge(edge) {
			this.currentLinks.add(edge);
		},
		clearCurEdge() {
			this.currentLinks = [];
		}
	},
	persist: piniaPersistConfig("TopoStore")
});
