import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/',
      component: function (resolve) { require(['@/views/Index'], resolve) }
    },
		{
      path: '/login',
      component: function (resolve) { require(['@/views/Login'], resolve) }
    },
		{
      path: '/answerquestion/:in_id',
      component: function (resolve) { require(['@/views/question/AnswerQuestion'], resolve) }
    },
		{
      path: '/completequestion/:in_id',
      component: function (resolve) { require(['@/views/question/CompleteQuestion'], resolve) }
    },
		{
      path: '*',
      component: function (resolve) { require(['@/views/Index'], resolve) }
    }
  ]
})

router.beforeEach((to, from, next) => {
	let { fullPath } = to
	let logState = cookies.get('logState') == 'true' ? true : false
	
	if( fullPath !== '/login' ){
		logState ? next() : next('/login')
	}
	else{
		!logState ? next() : next('/')
	}
})

router.afterEach((to, from) => {
  Vue.$vux.toast.hide()
  Vue.$vux.confirm.hide()
	Vue.$vux.loading.hide()
})

export default router