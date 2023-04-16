<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-07
 * index.vue
-->
<template>
	<div class="card container">
		<el-button :disabled="isImport" type="primary" style="margin: 2%" @click="importDefault">导入默认topo</el-button>
		<el-button type="primary" style="margin: 2%" @click="newTopo">Create topo</el-button>
		<div class="demo-image__placeholder">
			<div class="block">
				<img v-if="isImport" src="@/assets/mininet.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defaultTopo, createTopo } from "@/api/modules/topo";
import { ElMessage } from "element-plus";
import { MininetStore } from "@/stores/modules/mininet";
import { ref, defineEmits } from "vue";

const mininetStore = MininetStore();
const isImport = ref(mininetStore.isImportGet);
const importDefault = () => {
	defaultTopo()
		.then(() => {
			mininetStore.setIsImport();
			isImport.value = true;
			ElMessage.success("导入默认拓扑成功！");
		})
		.catch(() => {
			ElMessage.error("导入默认拓扑失败！");
		});
};
const emit = defineEmits(["toTopo"]);
const newTopo = () => {
	createTopo()
		.then(() => {
			ElMessage.success("Create topo success！");
			emit("toTopo");
		})
		.catch(() => {
			ElMessage.error("Create topo error");
		});
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
}

.demo-image__placeholder {
	margin: 0 auto;
}

.demo-image__placeholder .block {
	text-align: center;
	display: inline-block;
	width: 100%;
	box-sizing: border-box;
	vertical-align: top;
}

.demo-image__placeholder .demonstration {
	display: block;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	margin-bottom: 20px;
}

.demo-image__placeholder .el-image {
	padding: 0 5px;
	max-width: 70%;
	max-height: 70%;
}

.demo-image__placeholder.image-slot {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: var(--el-fill-color-light);
	color: var(--el-text-color-secondary);
	font-size: 14px;
}

.demo-image__placeholder .dot {
	animation: dot 2s infinite steps(3, start);
	overflow: hidden;
}
</style>
