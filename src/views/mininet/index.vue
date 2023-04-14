<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-06
 * index.vue
-->
<template>
	<el-container class="layout-container-demo" style="height: 100%">
		<el-aside width="250px">
			<el-scrollbar>
				<el-menu :default-openeds="['1']">
					<el-sub-menu index="1">
						<template #title>
							<el-icon><setting /></el-icon>Mininet
						</template>
						<el-menu-item-group>
							<template #title>操作</template>
							<el-menu-item index="1-7" @click="defaultCom">导入默认topo</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template #title>主机</template>
							<el-menu-item index="1-1" @click="changeForm('addHost')">添加主机</el-menu-item>
							<el-menu-item index="1-2" @click="changeForm('delHost')">删除主机</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template #title>交换机</template>
							<el-menu-item index="1-3" @click="changeForm('addSwitch')">添加交换机</el-menu-item>
							<el-menu-item index="1-4" @click="changeForm('delSwitch')">删除交换机</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template #title>链路</template>
							<el-menu-item index="1-5" @click="changeForm('addLink')">添加链路</el-menu-item>
							<el-menu-item index="1-6" @click="changeForm('delLink')">删除链路</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title>
							<el-icon><setting /></el-icon>Ryu
						</template>
						<el-menu-item-group>
							<template #title>Ryu Topology Viewer</template>
							<el-menu-item index="2-1" @click="topoiFrame">查看当前topo图</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group index="2-4">
							<template #title>查看流表</template>
							<el-menu-item index="2-4-1" @click="switchList">查看topo中的交换机与流表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template #title>添加流表</template>
							<el-menu-item index="2-2" @click="addFlows">添加流表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<div class="container">
			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<div class="toolbar">
						<el-dropdown>
							<el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>View</el-dropdown-item>
									<el-dropdown-item>Add</el-dropdown-item>
									<el-dropdown-item>Delete</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
						<span>Mininet</span>
					</div>
				</el-header>
				<el-empty v-if="status == 'empty'" description="请选择左边操作菜单" />

				<basic-form v-if="status == 'form'" :formType="FormType" />
				<topo-frame v-if="status == 'frame'" />
				<switch-table ref="switchtable" v-if="status == 'switch'" />
				<add-flow v-if="status == 'addflow'" />
				<default-view v-if="status == 'default'" />
			</el-container>
		</div>
	</el-container>
</template>

<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";

import basicForm from "@/views/form/basicForm/index.vue";
import topoFrame from "./components/topoFrame/index.vue";
import switchTable from "./components/switchTable/index.vue";
import addFlow from "./components/addFlow/index.vue";
import defaultView from "./components/defaultCom/index.vue";
import { ref } from "vue";

const switchtable = ref();
const status = ref("empty");
const FormType = ref("addHost");
const changeForm = (formType: string) => {
	status.value = "form";
	FormType.value = formType;
};
const topoiFrame = () => {
	status.value = "frame";
};
const switchList = () => {
	status.value = "switch";
	switchtable.value.goback();
};
const addFlows = () => {
	status.value = "addflow";
};
const defaultCom = () => {
	status.value = "default";
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
