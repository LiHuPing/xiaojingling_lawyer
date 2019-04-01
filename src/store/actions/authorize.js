import config from '@/config/config'
import cookies from 'js-cookie'
import { toQueryString } from '@/utils/toQueryString'
import axios from 'axios'
import md5 from 'md5'

export const authorizeAction = {
  fetchAuthorize ({ dispatch, commit, state, rootState }, param, defaultParam = config.defaultParam) {
    const { data, onSuccess, onFail, router } = param
    
		const SUCCESS = config.status.success
		const FAIL = config.status.fail
		const EXPIRES = config.status.expires
		
    axios({
      method: 'post',
      baseURL: config.serviceHost,
      url: '/lawyer/login/',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function (data2, headers) {
        return toQueryString(data2)
      }],
      timeout: 60000,
      data: Object.assign({}, defaultParam, { "token": md5('XJL_CRM_API'), "authType": "pub" }, data)
    })
		.then((res) => {
			if (res && res.status === 200) {
				let { code } = res.data
				if( SUCCESS.indexOf(code) > -1 ) {
					const { lawyer_id, lawyer_name, login_key, user_name_reg } = res.data.data
					cookies.set('logState', 'true', { expires: .958 })
					cookies.set('token', login_key, { expires: 7 })
					cookies.set('lawyer_name', lawyer_name, { expires: 7 })
					cookies.set('lawyer_id', lawyer_id, { expires: 7 })
					cookies.set('user_name_reg', user_name_reg, { expires: 7 })
					
					commit('LOGIN_SUCCESS', {
						data: res.data.data
					})
					
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( FAIL.indexOf(code) < 0 ) {
					commit('LOGIN_FAILURE', {
						data: res.data
					})
					if (typeof onFail === 'function') {
						onFail(res.data)
					}
				}
			}
		})
		.catch((error) => {
			commit('LOGIN_FAILURE', {
				data: error
			})
			if (typeof onFail === 'function') {
				if (config.debug) {
					onFail({ msg: JSON.stringify(error) })
				}
				else {
					onFail({ msg: '服务器无响应' })
				}
			}
		})
  },
	
	reLogin({ dispatch, commit, state, rootState }, param) {
    const { data, onSuccess, onFail, router } = param
    
		const SUCCESS = config.status.success
		const FAIL = config.status.fail
		const EXPIRES = config.status.expires
		
		let lawyer_id = rootState.authorize.userInfo.lawyer_id || cookies.get('lawyer_id') || ""
		let lawyer_name = rootState.authorize.userInfo.lawyer_name|| cookies.get('lawyer_name') || ""
		let user_name_reg = rootState.authorize.userInfo.user_name_reg || cookies.get('user_name_reg') || ""
		
    axios({
      method: 'post',
      baseURL: config.serviceHost,
      url: '/sysset/adminperm/',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function (data2, headers) {
        return toQueryString(data2)
      }],
      timeout: 60000,
      data: Object.assign({}, defaultParam, { "token": md5('XJL_CRM_API'), "authType": "pub", lawyer_id }, data)
    })
		.then((res) => {
			if (res && res.status === 200) {
				let { code } = res.data
				if( SUCCESS.indexOf(code) > -1 ) {
					let result = { perm: res.data.data, lawyer_id, lawyer_name, user_name_reg }
					
					commit('LOGIN_SUCCESS', {
						data: result
					})
					
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( FAIL.indexOf(code) < 0 ) {
					commit('LOGIN_FAILURE', {
						data: res.data
					})
					if (typeof onFail === 'function') {
						onFail(res.data)
					}
				}
			}
		})
		.catch((error) => {
			commit('LOGIN_FAILURE', {
				data: error
			})
			if (typeof onFail === 'function') {
				if (config.debug) {
					onFail({ msg: JSON.stringify(error) })
				}
				else {
					onFail({ msg: '服务器无响应' })
				}
			}
		})
  }
}
