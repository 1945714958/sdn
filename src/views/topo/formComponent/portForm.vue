<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-21
 * hostForm.vue
-->
<template>
	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
		<el-form-item label="端口名称">
			<el-input v-model="formLabelAlign.name" />
		</el-form-item>
		<el-form-item v-if="!topoState.editBool" label="mac地址">
			<el-input v-model="formLabelAlign.mac" />
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { ref, watch, defineExpose } from "vue";
import { TopoStore } from "@/stores/modules/topo";

const topoState = TopoStore();
const labelPosition = ref("right");
watch(
	() => topoState.currentPortGet,
	NewVal => {
		formLabelAlign.value.name = NewVal.label;
	},
	{
		deep: true
	}
);

const formLabelAlign = ref({
	name: topoState.currentPortGet.label,
	mac: topoState.currentPortGet.mac
});
defineExpose({
	formLabelAlign
});
</script>

<style scoped lang="scss"></style>
