import Vue from 'vue'
import App from './App'
import '@/static/fonts/iconfont.css'
import store from '@/store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'



Vue.filter("formatDate", function(data) {
	const date = new Date(data)
	console.log(date)
	const day = date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0')
	return date.getFullYear() + '-' + day
})

const app = new Vue({
	...App,
	store
})


app.$mount()
