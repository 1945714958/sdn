<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-24
 * flowTable.vue
-->
<template>
	<el-drawer v-model="table" direction="rtl" size="50%">
		<el-table :data="gridData">
			<el-table-column property="data" align="center">
				<template #header>
					<div style="width: 100%; display: flex; justify-content: space-between">
						<div>flow_table</div>
						<div>
							<el-button @click="add" type="primary">append flow_table</el-button>
							<el-button @click="clear" type="danger">clear flow_table</el-button>
						</div>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</el-drawer>
	<el-dialog v-model="dialogTableVisible" title="add flow_table_item">
		<el-upload
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
				<div class="el-upload__tip">Please upload a file in JSON format</div>
			</template>
		</el-upload>
		<el-button type="success" @click="submitUpload"> add </el-button>
	</el-dialog>
</template>

<script setup lang="ts">
import { getFlowTable, clearFlowTable, addFlowTable } from "@/api/modules/topo";
import { ref, defineExpose } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, UploadFile, UploadFiles, genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const table = ref(false);
const gridData = ref([]);
const id = ref();
const changeShow = (dpid: number) => {
	table.value = !table.value;
	if (table.value) {
		id.value = dpid;
		getFlowTable({ id: dpid })
			.then((res: any) => {
				gridData.value = res[Object.keys(res)[0]].map((item: any) => {
					return {
						data: JSON.stringify(item)
					};
				});
			})
			.catch(() => {
				ElMessage.error("获取流表失败！");
			});
	}
};
const clear = () => {
	clearFlowTable({ id: id.value });
};
const add = () => {
	dialogTableVisible.value = true;
};

const dialogTableVisible = ref(false);
const fileList = ref();
const upload = ref<UploadInstance>();
const Form = ref();
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
	if (fileList.value == undefined) {
		ElMessage.error("文件不能为空！");
		return;
	}
	Read(fileList.value[0].raw).then((res: any) => {
		Form.value = res;
		console.log(res);
		if (Form.value) {
			addFlowTable({ flow: JSON.stringify(Form.value) })
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
	// uploadRef.value!.submit();
};
defineExpose({
	changeShow
});
</script>
