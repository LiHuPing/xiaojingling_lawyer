import { recordAction } from '../actions/record'
import { recordMutation } from '../mutations/record'

export const record = {
  state: {
		waitRecord: {
			list: []
		},
		doneRecord: {
			list: []
		}
  },
  mutations: recordMutation,
  actions: recordAction
}
