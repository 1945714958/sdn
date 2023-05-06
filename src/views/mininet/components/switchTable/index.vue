<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-07
 * index.vue
-->
<template>
	<div class="container card">
		<el-table v-if="detail" :data="flowTable" style="width: 100%">
			<el-table-column fixed prop="id" label="交换机" />
			<el-table-column fixed="right" label="Operations" width="200">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleClick(scope.row.id)">查看流表</el-button>
					<el-button link type="primary" size="small" @click="clear(scope.row.id)">清空流表</el-button>
				</template>
			</el-table-column>
		</el-table>
		<table-list :tableData="tableData" v-if="!detail" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineExpose } from "vue";
import tableList from "../tableList/index.vue";
import { getSwitchs, clearFlowTable } from "@/api/modules/topo";
import { ElMessage } from "element-plus";
import { getFlowTable } from "@/api/modules/topo";

const flowTable = ref([]);
const detail = ref(true);
onMounted(() => {
	getSwitches();
});

const getSwitches = async () => {
	await getSwitchs().then((res: any) => {
		flowTable.value = res.map((item: any) => {
			return {
				id: item
			};
		});
	});
};

const handleClick = async (id: number) => {
	await getList(id);
};
const clear = (id: number) => {
	clearFlowTable({ id: id })
		.then((res: any) => {
			if (res.status == 200) {
				ElMessage.success("清空成功！当前交换机流表已清空");
			}
		})
		.catch(() => {
			ElMessage.error("清空失败！请检查交换机是否正确！");
		});
};
const goback = () => {
	detail.value = true;
};
const tableData = ref([]);
const getList = (curid: number) => {
	getFlowTable({ id: curid })
		.then((res: any) => {
			tableData.value = res[Object.keys(res)[0]].map((item: any) => {
				return {
					data: JSON.stringify(item)
				};
			});
			detail.value = false;
		})
		.catch(() => {
			ElMessage.error("获取流表失败！");
		});
};
defineExpose({
	goback
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
}
</style>
