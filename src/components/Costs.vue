<template>
	<div class="cost-wrapper">
		<div class="cost-item" v-for="cost in ['0','1','2','3','4','5','6','7+']" :key="cost">
			<cost :cost="cost" @select="$emit('select', $event)" />
		</div>
	</div>
</template>

<script>

import Cost from './Cost.vue'

export default {
	components: {
		Cost
	}
}
</script>

<style>
	.cost-wrapper {
		width:100%;
		display:flex;
		justify-content: space-between;
		width:600px;
		margin:0 auto;
	}
	.cost-item{
	}

</style>
