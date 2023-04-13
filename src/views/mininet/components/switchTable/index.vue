<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-07
 * index.vue
-->
<template>
	<div class="container">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column fixed prop="id" label="交换机" />
			<el-table-column fixed="right" label="Operations" width="200">
				<template #default>
					<el-button link type="primary" size="small" @click="handleClick">查看流表</el-button>
					<el-button link type="primary" size="small">清空流表</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["flowtable"]);

const tableData = [
	{
		id: "1"
	},
	{
		id: "2"
	}
];

const handleClick = () => {
	emit("flowtable");
};
</script>

<style scoped lang="scss"></style>
