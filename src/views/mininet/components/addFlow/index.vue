<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-07
 * index.vue
-->
<template>
	<div class="card container">
		<el-tabs tab-position="left" v-model="tab" class="demo-tabs">
			<el-tab-pane label="JSON文件"></el-tab-pane>
			<el-tab-pane label="JSON文本"></el-tab-pane>
		</el-tabs>

		<div class="right-content">
			<el-button class="ml-3 btn" type="success" @click="submitUpload"> 添加 </el-button>
			<el-upload v-if="tab == 0" ref="uploadRef" class="upload-demo" drag :auto-upload="false" action="#" multiple>
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
				<template #tip>
					<div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
				</template>
			</el-upload>
			<el-form v-if="tab == 1" ref="FormRef" :model="Form" class="textArea">
				<el-form-item label="流表项" prop="JSON">
					<el-input :rows="10" v-model="Form.JSON" placeholder="请输入流表项的JSON字符串" type="textarea" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";
import { ref } from "vue";
import type { FormInstance } from "element-plus";

const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
	uploadRef.value!.submit();
};
const FormRef = ref<FormInstance>();
const Form = ref({
	JSON: ""
});
const tab = ref(0);
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	.demo-tabs {
		height: 100%;
	}
	.right-content {
		width: 85%;
		.upload-demo {
			width: 70%;
			height: 50%;
			margin: 5% auto;
		}
		.btn {
			width: 15%;
		}
		.textArea {
			margin: 5% auto;
			width: 80%;
		}
	}
}
</style>
