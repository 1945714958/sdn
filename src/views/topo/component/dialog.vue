<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-21
 * dialog.vue
-->
<template>
	<el-dialog v-model="centerDialogVisible" :title="'edit ' + item?.group" width="30%" center>
		<component ref="form" :is="component"></component>
		<template #footer>
			<span class="dialog-footer">
				<el-button v-if="topoState.editBool" @click="cancel">取消</el-button>
				<el-button v-if="topoState.editBool" type="primary" @click="save">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, defineExpose, computed } from "vue";
import hostForm from "../formComponent/hostForm.vue";
import controllerForm from "../formComponent/controllerForm.vue";
import switchForm from "../formComponent/switchForm.vue";
import portForm from "../formComponent/portForm.vue";
import { TopoStore } from "@/stores/modules/topo";

const formMap = {
	host: hostForm,
	switch: switchForm,
	controller: controllerForm,
	port: portForm
};
const form = ref();
const component = computed(() => {
	return formMap[item.value?.group] || "div";
});
const centerDialogVisible = ref(false);
const callback = ref();
const item = ref();
const topoState = TopoStore();
const edit = (itemParam, resolve) => {
	setParam(itemParam);
	item.value = itemParam;
	callback.value = resolve;
	centerDialogVisible.value = true;
};
const save = () => {
	Object.keys(form.value.formLabelAlign).map(val => {
		item.value[val] = form.value.formLabelAlign[val];
	});
	item.value.label = form.value.formLabelAlign.name;
	setParam(item.value);
	callback.value(item.value);
	close();
	ElMessage.success("保存成功！");
};
const cancel = () => {
	callback.value(null);
	close();
};
const close = () => {
	centerDialogVisible.value = false;
	item.value = null;
	callback.value = null;
};
const setParam = itemParam => {
	if (itemParam.group == "switch") {
		topoState.setSwitch(itemParam);
	} else if (itemParam.group == "host") {
		topoState.setHost(itemParam);
	} else if (itemParam.group == "port") {
		topoState.setPort(itemParam);
	}
};
defineExpose({
	edit
});
</script>
<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>
