import { commonAction } from '../actions/common'
import { commonMutation } from '../mutations/common'

export const common = {
  state: {
    inquiryDetail: {
			send_first_list: {},
			send_second_list: {}
		},
		qiniuToken: {}
  },
  mutations: commonMutation,
  actions: commonAction
}
