<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-24
 * flowTable.vue
-->
<template>
	<el-drawer v-model="table" direction="rtl" size="50%">
		<el-table :data="gridData">
			<el-table-column property="date" label="流表项" />
		</el-table>
	</el-drawer>
</template>

<script setup lang="ts">
import { getFlowTable } from "@/api/modules/topo";
import { ElMessage } from "element-plus";
import { ref, defineExpose } from "vue";

const table = ref(false);
const gridData = ref([]);
const changeShow = (pid: number) => {
	table.value = !table.value;
	if (table.value) {
		getFlowTable({ id: pid })
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
defineExpose({
	changeShow
});
</script>

<style scoped lang="scss"></style>
