<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-17
 * visCom.vue
-->
<template>
	<div class="container">
		<el-row style="position: absolute; z-index: 111; left: 50%; transform: translateX(-50%)">
			<el-button @click="add('controller')" type="primary" class="btn" title="控制器" size="large" circle>
				<img src="@/assets/network/controller.dark.svg" class="svg" alt="" />
			</el-button>
			<el-button @click="add('switch')" class="btn" type="success" title="交换机" size="large" circle>
				<img src="@/assets/network/switch.dark.svg" class="svg" alt="" />
			</el-button>
			<el-button @click="add('host')" class="btn" type="info" title="主机" size="large" circle>
				<img src="@/assets/network/host.dark.svg" class="svg" alt="" />
			</el-button>
			<el-button @click="add('port')" class="btn" color="#626aef" title="端口" size="large" circle>
				<img src="@/assets/network/port.dark.svg" class="svg" alt="" />
			</el-button>
			<el-button @click="addEdge" class="btn" title="添加边" type="warning" size="large" circle>
				<Sort class="svg" />
			</el-button>
			<el-button @click="remove" class="btn" type="danger" size="large" title="删除选择" circle>
				<Delete class="svg" />
			</el-button>
		</el-row>
		<dialog-view ref="dialog" />
		<flow-table ref="flowtable" :id="pid" />
		<div id="mynetwork" class="child"></div>
	</div>
</template>

<script lang="ts" setup>
import { Network } from "vis-network/peer";
import { ref, defineExpose } from "vue";
import { Delete, Sort } from "@element-plus/icons-vue";

import controllerImgLight from "@/assets/network/controller.dark.svg";
import hostImgLight from "@/assets/network/host.dark.svg";
import portImgLight from "@/assets/network/port.dark.svg";
import switchImgLight from "@/assets/network/switch.dark.svg";
import { ElMessage } from "element-plus";
import dialogView from "./dialog.vue";
import flowTable from "./flowTable.vue";
import { TopoStore } from "@/stores/modules/topo";

const topoState = TopoStore();
console.log(topoState.NodesGet);

let network;
let newItem;

const visCon = ref();

let options = {
	physics: {
		enabled: false
	},
	configure: {
		enabled: false, // 打开或关闭配置界面。
		filter: function (option, path) {
			return path.indexOf("physics") !== -1;
		}, // 如果布尔值为true，则给出所有选项，false将不显示任何值。 如果提供了字符串，则允许以下任意组合：节点，边，布局，交互，操纵，物理，选择，渲染器。随意想出一个有趣的分开的字符。最后，当提供一个字符串数组时，任何前面提到的字段都被接​​受。当提供一个函数时，你会收到两个参数。选项对象中的选项和选项的路径。如果它返回true，则选项将显示在配置程序中。
		//              container:  undefined,
		showButton: true // 在配置器底部显示生成选项按钮。
	},
	layout: {
		hierarchical: {
			enabled: true, //切换分层布局系统
			levelSeparation: 200, //不同级别之间的距离。
			nodeSpacing: 250, // 自由轴上节点之间的最小距离,这仅适用于初始布局。如果启用物理，则节点距离将存在有效的节点距离。
			treeSpacing: 250, //不同树木之间的距离（独立网络）
			blockShifting: true, // 每个节点都会检查空白，并尽可能地将它的分支与它一起移动，并在任何级别上考虑nodeSpacing
			edgeMinimization: true, // 每个节点将尝试沿其自由轴移动以减少其边缘的总长度
			parentCentralization: true, // 如果为true，则布局算法完成后，父节点将再次居中。
			direction: "UD", // UD, DU, LR, RL
			sortMethod: "directed" // directed hubsize
		}
	},
	nodes: {
		// Invisible border, 0 makes selected border dissapear
		borderWidth: 0.0001,
		borderWidthSelected: 2,
		font: {
			align: "center",
			face: "Source Sans Pro",
			strokeWidth: 0,
			color: "white"
		},
		shapeProperties: {
			borderRadius: 6,
			useBorderWithImage: true
		},
		scaling: {
			label: {
				// Don't hide labels while zooming in too much (useful for image export)
				maxVisible: Number.MAX_SAFE_INTEGER
			}
		},
		chosen: true
	},
	edges: {
		smooth: false,
		font: {
			align: "top",
			face: "Source Sans Pro",
			strokeWidth: 0
		}
	},
	interaction: {
		hover: true
	},
	manipulation: {
		enabled: true,
		initiallyActive: false,
		addNode: async (node, callback) => {
			await editer(newItem);
			if (editBool.value) {
				topoState.addNodes(newItem);
			}
			topoState.setEditBool(false);
			callback();
		},
		addEdge: async (node, callback) => {
			callback();
			node.id = new Date().getTime();
			topoState.addCurEdge(node);
			// if (topoState.CurLinksGet.length == 2) {
			// 	topoState.ADDLINKS();
			// }
			topoState.addEdges(node);
		},
		editNode: async (node, callback) => {
			await editer(node);
			callback();
		},
		editEdge: true,
		deleteNode: true,
		deleteEdge: true
	},
	groups: {
		controller: {
			shape: "image",
			size: 25,
			image: controllerImgLight,
			color: {
				border: "#075Cff",
				background: "#141414",
				hover: {
					background: "#141414"
				}
			}
		},
		dummy: {
			shape: "box",
			font: {
				face: "Source Code Pro",
				align: "left"
			},
			borderWidth: 1
		},
		host: {
			shape: "image",
			size: 25,
			image: hostImgLight,
			color: {
				border: "#11ffff",
				background: "#141414",
				hover: {
					background: "#141414"
				}
			}
		},
		port: {
			shape: "image",
			size: 12,
			image: portImgLight,
			color: {
				border: "#00706C",
				background: "#141414",
				hover: {
					background: "#141414"
				}
			}
		},
		switch: {
			shape: "image",
			size: 25,
			image: switchImgLight,
			color: {
				border: "#FB6800",
				background: "#141414",
				hover: {
					background: "#141414"
				}
			}
		}
	}
};
const add = (type: string) => {
	ElMessage.success("左键单机屏幕进行增加设备操作");
	const id = new Date().getTime();
	newItem = { id, group: type };
	topoState.setEditBool(true);
	network.addNodeMode();
};

const addEdge = () => {
	ElMessage.success("左键拖动设备进行加边操作");
	network.addEdgeMode();
};
const remove = () => {
	network.deleteSelected();
};

const editBool = ref(false);
const editer = async node => {
	const item = await new Promise(resolve => {
		dialog.value.edit(node, resolve);
	});
	editBool.value = true;
	if (!item) {
		editBool.value = false;
		network.disableEditMode();
	}
};

const flowtable = ref();
const pid = ref(0);
const dialog = ref();

const changeShowFlowTable = (pid: number) => {
	flowtable.value.changeShow(pid);
};

const init = () => {
	visCon.value = document.getElementById("mynetwork");

	let data = {
		nodes: topoState.NodesGet,
		edges: topoState.EdgesGet
	};

	// 初始化关系图
	network = new Network(visCon.value, data, options);
	network.on("doubleClick", async event => {
		console.log(event);
		network.editNode();
	});
	network.on("oncontext", e => {
		const id = network.getNodeAt({ x: e.pointer.DOM.x, y: e.pointer.DOM.y });
		id && network.selectNodes([id], true);
		const res = topoState.NodesGet.map(item => item.id == id && item.group == "switch");
		console.log(e);
		if (res.indexOf(true) != -1) changeShowFlowTable(e.nodes[0]);

		e.event.preventDefault();
	});
};
defineExpose({
	init
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	position: relative;
}
.child {
	width: 100%;
	height: 100%;
}
.btn {
	position: relative;
	.svg {
		width: 60%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
