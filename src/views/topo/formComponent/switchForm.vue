<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-21
 * hostForm.vue
-->
<template>
	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
		<el-form-item label="交换机名称">
			<el-input v-model="formLabelAlign.name" />
		</el-form-item>
		<el-form-item label="pid">
			<el-input v-model="formLabelAlign.pid" />
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { TopoStore } from "@/stores/modules/topo";

const topoState = TopoStore();
const labelPosition = ref("right");
watch(
	() => topoState.currentSwitchGet,
	NewVal => {
		formLabelAlign.value.name = NewVal.label;
	},
	{
		deep: true
	}
);
const formLabelAlign = ref({
	name: topoState.currentSwitchGet.label,
	pid: topoState.currentSwitchGet.pid
});
</script>

<style scoped lang="scss"></style>
