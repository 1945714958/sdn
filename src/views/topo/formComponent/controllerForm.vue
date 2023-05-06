<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-21
 * hostForm.vue
-->
<template>
	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
		<el-form-item label="控制器名称">
			<el-input v-model="formLabelAlign.name" />
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const labelPosition = ref("right");

const formLabelAlign = reactive({
	name: "c0"
});
</script>

<style scoped lang="scss"></style>
