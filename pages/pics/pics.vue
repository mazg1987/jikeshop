<template>
	<view class="pics">
		<scroll-view scroll-y class="left">
			<view @click="leftItemClick(item,index)" :class="['item',current==index?'active':'']" v-for="(item,index) in categorys"
			 :key="item.id">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in pics" :key="item.id">
				<!--预览图片-->
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="pics.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				categorys: [],
				current: 0,
				pics: []
			}
		},
		created() {
			this.getCategorys()
		},
		methods: {
			async getCategorys() {
				let result = await myRequestGet("/api/getimgcategory")
				if (result.status === 0) {
					this.categorys = result.message;
					this.getPics(result.message[0].id)
				}
			},
			async getPics(id) {
				let result = await myRequestGet(`/api/getimages/${id}`)
				console.log(result);
				if (result.status === 0) {
					this.pics = result.message;
				}
			},
			leftItemClick(item, index) {
				this.current = index;
				this.getPics(item.id)
			},
			previewImg(url) {
				const urls = this.pics.map(item => {
					return item.img_url;
				})
				uni.previewImage({
					url,
					urls
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;

			.item {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: pink;
				color: #fff;
			}
		}

		.right {
			flex: 1;
			height: 100%;
			margin: 10rpx auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
					display: block;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}

	}
</style>
