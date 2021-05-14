<template>
	<view>
		{{JSON.stringify(carts)}}
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			...mapState(['carts'])
		}
	}
</script>

<style>

</style>
