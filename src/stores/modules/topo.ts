import { defineStore } from "pinia";
import { TopoState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { getHost, getSwitchs, getLinks } from "@/api/modules/topo";
import { DataSet } from "vis-data/peer";
export const TopoStore = defineStore({
	id: "TopoStore",
	state: (): TopoState => ({
		nodes: new DataSet([]),
		edges: new DataSet([]),
		Hosts: {},
		Switches: {},
		Links: {},
		currentHost: null,
		currentSwitch: null,
		currentPort: null
	}),
	getters: {
		HostsGet: state => state.Hosts,
		SwitchesGet: state => state.Switches,
		LinksGet: state => state.Links,
		currentHostGet: state => state.currentHost,
		currentSwitchGet: state => state.currentSwitch,
		currentPortGet: state => state.currentPort,
		NodesGet: state => state.nodes,
		EdgesGet: state => state.edges
	},
	actions: {
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
			Nodes.map(item => {
				console.log(item);

				this.nodes.add(item);
			});
		},
		setEdges(Edges) {
			Edges.map(item => {
				this.edges.add(item);
			});
		},
		addNodes(item) {
			this.nodes.add(item);
		},
		addEdges(item) {
			this.edges.add(item);
		}
	},
	persist: piniaPersistConfig("TopoStore")
});
