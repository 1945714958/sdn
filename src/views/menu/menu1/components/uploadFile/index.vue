<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-03-09
 * index.vue
-->
<template>
	<div class="card" style="width: 70%">
		<el-upload
			ref="uploadRef"
			:limit="1"
			:on-exceed="handleExceed"
			:on-change="handleChange"
			:on-remove="handleDelete"
			class="upload-demo"
			drag
			action="#"
			:auto-upload="false"
			multiple
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">将文件拖入此处，<em>或点击此处上传文件</em></div>
			<template #tip>
				<div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
			</template>
		</el-upload>
	</div>

	<div style="margin-top: 20px">
		<el-button @click="previous">上一步</el-button>
		<el-button @click="next">下一步</el-button>
	</div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { UploadInstance, UploadProps, UploadRawFile, genFileId } from "element-plus";
import { ref, defineEmits } from "vue";
import { ElMessage } from "element-plus";

const emit = defineEmits(["next", "previous"]);

const uploadRef = ref<UploadInstance>();
const curfile = ref();
const submitUpload = () => {
	uploadRef.value!.submit();
};
const handleExceed: UploadProps["onExceed"] = files => {
	uploadRef.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	uploadRef.value!.handleStart(file);
};
const handleChange: UploadProps["onChange"] = file => {
	curfile.value = file;
};
const handleDelete: UploadProps["onRemove"] = () => {
	curfile.value = undefined;
	return true;
};

const next = () => {
	if (curfile.value === undefined) {
		ElMessage({
			message: "请选择上传的论文",
			type: "warning"
		});
		return;
	}
	submitUpload();
	emit("next");
};
const previous = () => {
	emit("previous");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
