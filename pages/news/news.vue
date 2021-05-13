<template>
	<uni-list>
		<uni-list-item :to="`/pages/newsdetail/newsdetail?id=${item.id}`" v-for="item in newslist" :key="item.id" :note="item.zhaiyao" :thumb="item.img_url"
		 thumb-size="lg">
			<view slot="body" class="item slot-box slot-text">
				<view class="tit">{{item.title}}</view>
				<view class="info">
					<text>发表时间：{{item.add_time|formatDate }}</text>
					<text>浏览：{{item.click+123}}次</text>
				</view>
			</view>
		</uni-list-item>
	</uni-list>

</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				newslist: []
			}
		},
		created() {
			this.getNewsList();
		},
		methods: {
			async getNewsList() {
				let result = await myRequestGet("/api/getnewslist");
				if (result.status == 0) {
					this.newslist = result.message;
					console.log(this.newslist)
				}
			}
		}
	}
</script>

<style lang="less">
	.item {
		padding: 5px 10px;
		position: relative;

		.tit {
			font-size: 35rpx;
			font-weight: 800;
		}

		.info {
			font-size: 26rpx;
			margin-top: 20rpx;

			text:nth-child(2) {
				margin-left: 20px;
			}
		}
	}
</style>
