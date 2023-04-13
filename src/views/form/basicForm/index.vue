<template>
	<div class="card content-box">
		<el-form ref="formRef" :model="form" label-width="170px">
			<el-form-item v-if="props.formType == 'addHost' || props.formType == 'delHost'" prop="name" label="主机名 :">
				<el-input v-model="form.name" />
			</el-form-item>
			<el-form-item v-if="props.formType == 'addHost'" prop="ip" label="ip地址 :">
				<el-input v-model="form.ip" />
			</el-form-item>
			<el-form-item v-if="props.formType == 'addHost'" prop="switchName" label="交换机名 :">
				<el-input v-model="form.switchName" />
			</el-form-item>
			<el-form-item v-if="props.formType == 'addSwitch' || props.formType == 'delSwitch'" prop="switchName" label="交换机名 :">
				<el-input v-model="form.switchName" />
			</el-form-item>
			<el-form-item
				v-if="props.formType == 'addLink' || props.formType == 'delLink'"
				prop="form.host_1_Name"
				label="主机（交换机）1名 :"
			>
				<el-input v-model="form.host_1_Name" />
			</el-form-item>
			<el-form-item
				v-if="props.formType == 'addLink' || props.formType == 'delLink'"
				prop="form.host_2_Name"
				label="主机（交换机）2名 :"
			>
				<el-input v-model="form.host_2_Name" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">确定</el-button>
				<el-button @click="resetForm(formRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="basicForm">
import { form } from "@/api/interface/form";
import { ElMessage } from "element-plus";
import { ref, reactive, defineProps, watch } from "vue";
import type { FormInstance } from "element-plus";
// do not use same name with ref
type Prop = {
	formType: string;
};
const props = defineProps<Prop>();
const form = reactive<form>({
	name: "",
	ip: "",
	switchName: "",
	host_1_Name: "",
	host_2_Name: ""
});

watch(
	() => props.formType,
	() => {
		resetForm(formRef.value);
	},
	{
		deep: true
	}
);

const onSubmit = () => {
	ElMessage.success("提交的数据为 : " + JSON.stringify(form));
};
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
