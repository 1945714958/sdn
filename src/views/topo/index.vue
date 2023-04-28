<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-17
 * index.vue
-->
<template>
	<div class="container card">
		<visCom ref="vis" />
	</div>
</template>

<script setup lang="ts">
import visCom from "./component/visCom.vue";
import { TopoStore } from "@/stores/modules/topo";
import { DataSet } from "vis-data/peer";
import { Intf } from "@/stores/interface";
import { ref } from "vue";

const vis = ref();
const topoState = TopoStore();

const getIndex = () => {
	let idx = 115;
	return function () {
		return idx++;
	};
};

let nodes = new DataSet<{
	id: any;
	label: string;
	group: string;
	x?: number;
	y?: number;
	name?: string;
	pid?: number;
	intfs?: Intf[];
	ip?: string;
	mac?: string;
	intfsName?: string;
}>([{ id: 1, label: "c0", group: "controller" }]);
let edges = new DataSet([]);
let idx = getIndex();

topoState.getAll(callback);

function callback() {
	for (let i of topoState.HostsGet) {
		let portId = idx();
		const names = i.intfsName.split("-");
		nodes.add({ ...i, id: portId, label: names[0], group: "host" });
		nodes.add({ ...i, id: i.intfsName, label: i.intfsName, group: "port" });
		edges.add({ id: idx(), from: i.intfsName, to: portId });
	}
	for (let i of topoState.SwitchesGet) {
		const names = i.intfs[1].name.split("-");
		nodes.add({ ...i, id: i.pid, label: names[0], group: "switch" });
		edges.add({ id: idx(), from: 1, to: i.pid });

		i.intfs.map(item => {
			if (item.name != "lo") {
				nodes.add({ ...item, id: item.name, label: item.name, group: "port" });
				edges.add({ id: idx(), from: i.pid, to: item.name });
			}
		});
	}
	for (let i of topoState.LinksGet) {
		let from = i.intf1.name;
		let to = i.intf2.name;
		if (i.intf2.name.startsWith("s")) {
			from = i.intf2.name;
			to = i.intf1.name;
		}
		edges.add({ id: idx(), from: from, to: to });
	}
	topoState.setNodes(nodes);
	topoState.setEdges(edges);
	vis.value.init();
}
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
}
</style>
