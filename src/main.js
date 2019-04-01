// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from '@/store'
import { LoadingPlugin, ConfirmPlugin, ToastPlugin, AlertPlugin } from 'vux'
import VueScroller from 'vue-scroller'
import '@/style/ftui.less'
import '@/style/style.less'

Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(VueScroller)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
