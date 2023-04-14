<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-06
 * index.vue
-->
<template>
	<el-main>
		<el-scrollbar>
			<el-table :data="tableData">
				<el-table-column type="index" />
				<el-table-column prop="data" label="流表数据（JSON格式)" />
			</el-table>
		</el-scrollbar>
	</el-main>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { getFlowTable } from "@/api/modules/topo";
import { ElMessage } from "element-plus";
type Prop = {
	id: any;
};
const tableData = ref([]);
const props = defineProps<Prop>();
onMounted(() => {
	getFlowTable(props.id)
		.then((res: any) => {
			if (res.status == 200) {
				tableData.value = res.data[Object.keys(res.data)[0]].map((item: any) => {
					return {
						data: item
					};
				});
			}
		})
		.catch(() => {
			ElMessage.error("获取流表失败！");
		});
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
