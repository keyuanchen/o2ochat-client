import Vue from 'vue'
import App from './App'
import socket from './components/weapp.socket.io.js'

Vue.config.productionTip = false
Vue.prototype.socket = socket('172.20.10.2:8081')

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
