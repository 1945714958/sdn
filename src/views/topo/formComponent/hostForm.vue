<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-21
 * hostForm.vue
-->
<template>
	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
		<el-form-item label="主机名称 :">
			<el-input v-model="formLabelAlign.name" />
		</el-form-item>
		<el-form-item v-if="!topoState.editBool" label="ip地址 :">
			<el-input v-model="formLabelAlign.ip" />
		</el-form-item>
		<el-form-item v-if="!topoState.editBool" label="物理地址 :">
			<el-input v-model="formLabelAlign.mac" />
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { ref, watch, defineExpose, reactive } from "vue";
import { TopoStore } from "@/stores/modules/topo";

const labelPosition = ref("right");
const topoState = TopoStore();

watch(
	() => topoState.currentHost,
	NewVal => {
		formLabelAlign.name = NewVal.label;
	},
	{
		deep: true
	}
);
const formLabelAlign = reactive({
	name: topoState.currentHost.label,
	ip: topoState.currentHost.ip,
	mac: topoState.currentHost.mac
});

defineExpose({
	formLabelAlign
});
</script>

<style scoped lang="scss"></style>
