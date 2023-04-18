<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-17
 * visCom.vue
-->
<template>
	<div class="container">
		<el-row style="position: absolute; z-index: 111">
			<el-button @click="addHost" type="primary" :icon="Edit" circle />
			<el-button type="success" :icon="Check" circle />
			<el-button type="info" :icon="Message" circle />
			<el-button type="warning" :icon="Star" circle />
			<el-button type="danger" :icon="Delete" circle />
		</el-row>
		<div id="mynetwork" class="child"></div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { DataSet } from "vis-data/peer";
import { Network } from "vis-network/peer";
import { ref } from "vue";

import { Check, Delete, Edit, Message, Star } from "@element-plus/icons-vue";

import controllerImgLight from "@/assets/network/controller.light.svg";
import hostImgLight from "@/assets/network/host.light.svg";
import portImgLight from "@/assets/network/port.light.svg";
import switchImgLight from "@/assets/network/switch.light.svg";

const vis = ref();
const addHost = () => {
	vis.value.addHost();
};
onMounted(() => {
	const visCon = document.getElementById("mynetwork");
	let nodes = new DataSet([
		{ id: 1, label: "Node 1", group: "controller" },
		{ id: 2, label: "Node 2", group: "switch" },
		{ id: 6, label: "Node 6", group: "switch" },
		{ id: 3, label: "Node 3", group: "switch" },
		{ id: 4, label: "Node 4", group: "host" },
		{ id: 5, label: "Node 5", group: "host" }
	]);
	let edges = new DataSet([
		{ id: "1_3", from: 1, to: 3 },
		{ id: "1_6", from: 1, to: 6 },
		{ id: "1_2", from: 1, to: 2 },
		{ id: "2_3", from: 2, to: 4 },
		{ id: "2_5", from: 2, to: 5 }
	]);
	let data = {
		nodes: nodes,
		edges: edges
	};
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
				levelSeparation: 260, //不同级别之间的距离。
				nodeSpacing: 260, // 自由轴上节点之间的最小距离,这仅适用于初始布局。如果启用物理，则节点距离将存在有效的节点距离。
				treeSpacing: 260, //不同树木之间的距离（独立网络）
				blockShifting: false, // 每个节点都会检查空白，并尽可能地将它的分支与它一起移动，并在任何级别上考虑nodeSpacing
				edgeMinimization: false, // 每个节点将尝试沿其自由轴移动以减少其边缘的总长度
				parentCentralization: false, // 如果为true，则布局算法完成后，父节点将再次居中。
				direction: "UD", // UD, DU, LR, RL
				sortMethod: "directed", // directed hubsize
				shakeTowards: "roots"
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
			}
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
			hover: true,
			navigationButtons: false,
			keyboard: {
				enabled: true,
				speed: {
					x: -1,
					y: -1,
					zoom: 0.02
				},
				bindToWindow: true
			} // 启用键盘快捷键
		},
		manipulation: {
			enabled: false
		},
		groups: {
			controller: {
				shape: "image",
				size: 25,
				image: controllerImgLight,
				borderWidth: 2,
				color: { border: "green" }
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
				borderWidth: 2,
				color: { border: "blue" }
			},
			port: {
				shape: "image",
				size: 10,
				image: portImgLight,
				borderWidth: 2,
				color: { border: "yellow" }
			},
			switch: {
				shape: "image",
				size: 25,
				image: switchImgLight,
				borderWidth: 2,
				color: { border: "purple" }
			}
		}
	};
	// 初始化关系图
	new Network(visCon, data, options);
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
</style>
