<template>
	<view>
		<good-list :goods="goods"></good-list>

		<view class="more">
			<uni-load-more :status="loadingStatus"></uni-load-more>
			<!-- <view>没有更多数据了</view> -->
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	import GoodList from '@/components/GoodList.vue'
	export default {
		data() {
			return {
				pageindex: 1,
				goods: [],
				hasMore: true,
			}
		},
		created() {
			this.getGoods()
		},
		computed: {
			loadingStatus: function() {
				return this.hasMore ? 'loading' : 'noMore'
			}
		},
		methods: {
			async getGoods() {
				let result = await myRequestGet(`/api/getgoods?pageindex=${this.pageindex}`);
				if (result.status == 0) {
					result.message.length ? this.goods = [...this.goods, ...result.message] : this.hasMore = false
				}
			}
		},
		components: {
			GoodList
		},
		onReachBottom() {
			if (this.hasMore) {
				this.pageindex++;
				this.getGoods()
			}
		},
		onPullDownRefresh(){
			this.pageindex = 1;
			this.goods = [];
			this.hasMore = true;
			
			this.getGoods()
			.then(()=>{
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style>

</style>
