<template>
	<div class="card content-box">
		<div class="top">
			<div class="title">{{ title[step - 1] }}</div>
		</div>
		<el-steps style="width: 70%; margin-bottom: 4%" :active="step">
			<el-step :title="title[0]" :icon="Edit" description="选择模板文件"></el-step>
			<el-step :title="title[1]" :icon="Upload" description="上传论文文档"></el-step>
			<el-step :title="title[2]" :icon="Document" description="创建成功"></el-step>
		</el-steps>
		<choose-model @next="next" v-if="step === 1" ref="ChildDom" />
		<upload-file @previous="previous" @next="next" v-else-if="step === 2" />
		<deal-result @clear="againPost" v-else-if="step === 3" />
	</div>
</template>

<script setup lang="ts" name="menu1">
import { ref, Ref } from "vue";
import { Edit, Document, Upload } from "@element-plus/icons-vue";
import chooseModel from "./components/chooseModel/index.vue";
import uploadFile from "./components/uploadFile/index.vue";
import dealResult from "./components/dealResult/index.vue";

const title: Ref<string[]> = ref(["选择模板", "上传论文", "上传结果"]);
const ChildDom = ref(); //获取模板
let step = ref(1);
const next = () => {
	step.value++;
};
const previous = () => {
	step.value--;
};
const againPost = () => {
	step.value = 1;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
