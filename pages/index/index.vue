<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="5000" :duration="1000">
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<uni-grid :column="4">
			<uni-grid-item v-for="item in navs" :key="item.title">
				<view @click="itemClick(item)">
					<view :class="item.icons" ></view>
					<text>{{item.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>

		<good-list :goods="goods"></good-list>
	</view>
</template>

<script>
	import GoodList from '@/components/GoodList.vue'
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [{
						icons: "iconfont icon-ziyuan",
						title: "极客超市",
						path: "/pages/goods/goods"
					},
					{
						icons: "iconfont icon-tupian",
						title: "社区图片",
						path: "/pages/pics/pics"
					},
					{
						icons: "iconfont icon-guanyuwomen",
						title: "联系我们",
						path: "/pages/contact/contact"
					},
					{
						icons: "iconfont icon-shipin",
						title: "学习视频",
						path: "/pages/videos/videos"
					}
				]
			}
		},
		created() {
			this.getSwipers();
			this.getGoods();;
		},
		methods: {
			async getSwipers() {
				let result = await myRequestGet("/api/getlunbo");
				console.log(result, "99999999999")
				if (result.status === 0) {
					this.swipers = result.message;
				}
			},
			async getGoods() {
				let result = await myRequestGet("/api/getgoods");
				console.log(result, "888888")
				if (result.status === 0) {
					this.goods = result.message;
				}
			},
			itemClick(item){
				// console.log("555555555555",item.path)
				uni.navigateTo({
					url:item.path
				})
			}
		},
		components:{
			GoodList
		}
	}
</script>

<style lang="less">
	.container {
		.swiper {
			height: 422rpx;

			image {
				width: 100%;
			}
		}

		.uni-grid-item {
			text-align: center;

			.iconfont {
				background: pink;
				line-height: 90rpx;
				width: 90rpx;
				height: 90rpx;
				border-radius: 90px;
				margin: 10px auto;
				font-size: 25px;
			}

			text {
				font-size: 14px;
			}
		}
	}
</style>
