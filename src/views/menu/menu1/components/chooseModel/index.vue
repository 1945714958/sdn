<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-03-08
 * index.vue
-->
<template>
	<div class="card" style="width: 70%">
		<div class="mb-2 flex items-center text-sm">
			<span style="font-size: 15px; font-weight: 500; color: grey">批注语言 </span>
			<el-radio-group v-model="radio" class="ml-4">
				<el-radio label="1" size="large">中文</el-radio>
				<el-radio label="2" size="large">英文</el-radio>
			</el-radio-group>
		</div>
		<div style="width: 100%">
			<el-table
				ref="singleTableRef"
				:data="tableData"
				highlight-current-row
				style="width: 100%"
				height="200px"
				@current-change="handleCurrentChange"
			>
				<el-table-column type="index" width="50" />
				<el-table-column property="name" label="模板名称" />
				<el-table-column property="date" label="发布日期" width="250" />
			</el-table>
		</div>
	</div>
	<div style="margin-top: 20px">
		<el-button @click="next">下一步</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from "vue";
import { ElTable } from "element-plus";
import { ElMessage } from "element-plus";

const emit = defineEmits(["next"]);
interface Model {
	name: string;
	date: string;
}
const radio = ref("1");
const singleTableRef = ref<InstanceType<typeof ElTable>>();
const curRow = ref();
const handleCurrentChange = (val: Model | undefined) => {
	curRow.value = val;
};
const tableData: Model[] = [
	{
		name: "福州大学至诚学院通用模板",
		date: "2016-05-03 16:00:00"
	},
	{
		name: "福州大学至诚学院通用模板",
		date: "2016-05-03 16:00:00"
	},
	{
		name: "福州大学至诚学院通用模板",
		date: "2016-05-03 16:00:00"
	},
	{
		name: "福州大学至诚学院通用模板",
		date: "2016-05-03 16:00:00"
	},
	{
		name: "福州大学至诚学院通用模板",
		date: "2016-05-03 16:00:00"
	}
];
const next = () => {
	if (curRow.value === undefined) {
		ElMessage({
			message: "请选择合适的模板",
			type: "warning"
		});
		return;
	}
	emit("next");
};
defineExpose({
	curRow,
	radio
});
</script>

<style scoped lang="less"></style>
