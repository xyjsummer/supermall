import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from  './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//设置事件总线$bus
Vue.prototype.$bus = new Vue()

//安装toast插件(use会执行toast.js中obj的install函数)
Vue.use(toast)

//解决移动端的300ms延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store,
  toast,
  FastClick,
  VueLazyLoad
}).$mount('#app')
