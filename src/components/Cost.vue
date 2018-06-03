<template>
	<div class="wrapper" @click="$emit('select', cost)">
		<div class="container">
			{{cost}}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		cost: {
			required: true
		}
	}
}
</script>


<style scoped>
	.wrapper {
	}	
	.container {
		border: 1px solid #aaa;
		background-color: #ccc;
		padding: 15px;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
