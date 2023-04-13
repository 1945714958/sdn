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
				<el-table-column prop="id" label="流表id" width="140" />
				<el-table-column prop="data" label="流表数据（JSON格式)" />
			</el-table>
		</el-scrollbar>
	</el-main>
</template>

<script setup lang="ts">
import { ref } from "vue";
const item = {
	id: 0,
	data: "{'dasdsa':'dsa'}"
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
