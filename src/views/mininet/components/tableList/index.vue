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
import { ref, defineProps } from "vue";

// type item = {
// 	priority: number;
// 	cookie: number;
// 	idle_timeout: number;
// 	hard_timeout: number;
// 	byte_count: number;
// 	duration_sec: number;
// 	duration_nsec: number;
// 	packet_count: number;
// 	length: number;
// 	flags: number;
// 	actions: Array<string>;
// 	match: {
// 		dl_dst: string;
// 		dl_type: number;
// 	};
// 	table_id: number;
// };
type prop = {
	// [key: number]: item;
	tableData: any;
};
const props = defineProps<prop>();
const tableData = ref(props.tableData);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
