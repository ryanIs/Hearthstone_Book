<template>
	<img :src="card.cardImage"></img>
</template>

<script>
export default {
	props: {
		card: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style scoped>
	
</style>
