import config from '@/config/config'
import cookies from 'js-cookie'
import { toQueryString } from '@/utils/toQueryString'
import axios from 'axios'

export const recordAction = {
  fetchRecord ({ dispatch, commit, state, rootState }, param, defaultParam = config.defaultParam) {
    const userToken = rootState.authorize.userInfo.token || cookies.get('token')
		const { url, sign, data, onSuccess, onFail, router } = param
    
		const SUCCESS = config.status.success
		const FAIL = config.status.fail
		const EXPIRES = config.status.expires
		
    axios({
      method: 'post',
      baseURL: config.serviceHost,
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function (data2, headers) {
        return toQueryString(data2)
      }],
      timeout: 60000,
      data: Object.assign({}, defaultParam, { "token": userToken, "page_size": config.page_size }, data)
    })
		.then((res) => {
			if (res && res.status === 200) {
				let { code } = res.data
				if( SUCCESS.indexOf(code) > -1 ) {
					commit('RECORD_SUCCESS', {
						sign,
						data: res.data
					})
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( FAIL.indexOf(code) < 0 ) {
					commit('RECORD_FAILURE', {
						sign,
						data: res.data
					})
					if (typeof onFail === 'function') {
						onFail(res.data)
					}
				}
				else if( EXPIRES.indexOf(code) > -1 ){
					cookies.set('logState', 'false', { expires: 7 })
					router.push({ path: '/login' })
				}
			}
		})
		.catch((error) => {
			commit('RECORD_FAILURE', {
				sign,
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
