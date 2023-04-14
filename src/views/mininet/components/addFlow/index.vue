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
			<el-upload
				v-if="tab == 0"
				ref="upload"
				:limit="1"
				:on-exceed="handleExceed"
				class="upload-demo"
				drag
				:auto-upload="false"
				:file-list="fileList"
				:on-change="change"
				action="#"
				accept=".json"
			>
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
				<template #tip>
					<div class="el-upload__tip">请上传JSON文件</div>
				</template>
			</el-upload>
			<el-form v-else :model="Form" class="textArea">
				<el-form-item label="流表项" prop="JSON">
					<el-input :rows="10" v-model="Form" placeholder="请输入流表项的JSON字符串" type="textarea" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage, UploadFile, UploadFiles, genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { addFlowTable } from "@/api/modules/topo";

const upload = ref<UploadInstance>();
const Form = ref();
const tab = ref(0);
const fileList = ref();

const handleExceed: UploadProps["onExceed"] = files => {
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
};

const change: UploadProps["onChange"] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	fileList.value = uploadFiles;
};

const Read = (raw: any) => {
	return new Promise<any>((resolve, reject) => {
		let reader = new FileReader();

		reader.readAsText(raw, "UTF-8");
		if (typeof FileReader === "undefined") {
			reject("浏览器不支持上传文件");
			return;
		}
		reader.onload = e => {
			resolve(e!.target!.result);
		};
	});
};

const submitUpload = () => {
	if (tab.value == 0) {
		if (fileList.value == undefined) {
			ElMessage.error("文件不能为空！");
			return;
		}
		Read(fileList.value[0].raw).then((res: any) => {
			Form.value = res;
			if (Form.value) {
				addFlowTable({ flow: Form.value })
					.then((res: any) => {
						if (res.status == 200) {
							ElMessage.success("添加成功！");
						}
					})
					.catch(() => {
						ElMessage.error("添加失败！");
					});
			}
		});
	} else {
		if (!Form.value) {
			ElMessage.error("表单不能为空！");
			return;
		}
		if (Form.value) {
			addFlowTable({ flow: Form.value })
				.then((res: any) => {
					if (res.status == 200) {
						ElMessage.success("添加成功！");
					}
				})
				.catch(() => {
					ElMessage.error("添加失败！");
				});
		}
	}

	// uploadRef.value!.submit();
};
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
