import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		carts:uni.getStorageSync('carts')||[]
	},
	mutations:{
		addToCar(state,obj){
			console.log("要加入购物车的数据是",obj)
			//1.先看该商品在购物车中是否存在
			var fgoods = state.carts.filter(item=>{
				if(item.id == obj.id){
					return item;
				}
			})
			
			//如果不存在，则直接将商品加入到购物车
			if(!fgoods.length){
				state.carts.push(obj);
			}
			else{
				fgoods[0].buynum += 1;
			}
			
			uni.setStorageSync('carts',state.carts)
		}
	}
})

export default store;