<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-24
 * flowTable.vue
-->
<template>
	<el-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="50%">
		<el-table :data="gridData">
			<el-table-column property="date" label="Date" width="150" />
			<el-table-column property="name" label="Name" width="200" />
			<el-table-column property="address" label="Address" />
		</el-table>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from "vue";

type Prop = {
	id: number;
};

const props = defineProps<Prop>();
console.log(props);

const table = ref(false);
const gridData = [
	{
		date: "2016-05-02",
		name: "Peter Parker",
		address: "Queens, New York City"
	},
	{
		date: "2016-05-04",
		name: "Peter Parker",
		address: "Queens, New York City"
	},
	{
		date: "2016-05-01",
		name: "Peter Parker",
		address: "Queens, New York City"
	},
	{
		date: "2016-05-03",
		name: "Peter Parker",
		address: "Queens, New York City"
	}
];
const changeShow = () => {
	table.value = !table.value;
};
defineExpose({
	changeShow
});
</script>

<style scoped lang="scss"></style>
