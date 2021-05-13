<template>
	<view class="news_detail">
		<view class="news_title">
			{{newsInfo.title}}
		</view>
		<view class="info">
			<text>发表时间：{{newsInfo.add_time|formatDate}}</text>
			<text>浏览：{{newsInfo.click}}</text>
		</view>
		<view class="content">
			<!-- #ifdef MP-WEIXIN|H5|APP-PLUS -->
			<rich-text :nodes="newsInfo.content"></rich-text>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<rich-text :nodes="htmlNodes"></rich-text>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	import parse from '@/utils/htmlparser.js';
	export default {
		data() {
			return {
				id: null,
				newsInfo: {},
				htmlNodes: null
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getNewsDetail();
		},
		methods: {
			async getNewsDetail() {
				let result = await myRequestGet(`/api/getnew/${this.id}`);
				if (result.status === 0) {
					this.newsInfo = result.message[0];

					//#ifdef MP-ALIPAY
					//支付宝小程序rich-text不支持字符串，需要是nodes数组
					this.htmlNodes = parse(this.newsInfo.content)
					//#endif
				}
			}
		}
	}
</script>

<style lang="less">
	.news_detail {
		padding: 15rpx;

		.news_title {
			text-align: center;
			font-size: 35rpx;
			font-weight: 800;
			padding: 15rpx;
		}

		.info {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			padding: 15rpx;
		}

		.content {
			padding: 15rpx;
			font-size: 28rpx;
			color: gray;
		}
	}
</style>
