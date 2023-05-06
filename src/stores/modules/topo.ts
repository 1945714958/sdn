import { defineStore } from "pinia";
import { TopoState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { getHost, getSwitchs, getLinks, DelHost, DelSwitch, DelLink } from "@/api/modules/topo";
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
		stack: [],
		deleteStack: []
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
		StackGet: state => state.stack
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

		delete(nodes) {
			this.nodes.map(item => {
				nodes.map(id => {
					if (id == item.id) {
						if (item.group == "switch") DelSwitch({ switchName: item.label });
						else if (item.group == "port") {
							[].push.call(this.deleteStack, item.label.split("-")[0]);
							console.log(this.deleteStack);
							if (this.deleteStack.length == 2) {
								let name1 = this.deleteStack[0];
								let name2 = this.deleteStack[1];
								DelLink({ Name1: name1, Name2: name2 });
								if (name1.startsWith("h")) {
									DelHost({ name: name1 });
								}
								if (name2.startsWith("h")) {
									DelHost({ name: name2 });
								}
								this.deleteStack = [];
							}
						}
					}
				});
			});
		},
		pushStack(node) {
			console.log(this.stack.length);
			if (this.stack.length >= 2) {
				this.stack = [];
				console.log(this.stack);
			}
			[].push.call(this.stack, node);
		},
		clearStack() {
			this.stack = [];
		}
	},
	persist: piniaPersistConfig("TopoStore")
});
