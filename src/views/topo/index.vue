<!--
 * new page
 * @author: XiaoBao
 * @since: 2023-04-17
 * index.vue
-->
<template>
	<div class="container card">
		<visCom ref="vis" />
	</div>
</template>

<script setup lang="ts">
import visCom from "./component/visCom.vue";
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
}
</style>
