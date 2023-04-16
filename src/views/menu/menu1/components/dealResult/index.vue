<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-03-09
 * index.vue
-->
<template>
	<div class="container">
		<el-result icon="success" title="上传成功" sub-title="表单创建成功">
			<template #extra>
				<el-button>查看预览</el-button>
				<el-button type="primary" @click="again">再次上传</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["clear"]);

const again = () => {
	emit("clear");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
