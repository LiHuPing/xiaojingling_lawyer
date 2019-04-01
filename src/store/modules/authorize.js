import { authorizeMutation } from '../mutations/authorize'
import { authorizeAction } from '../actions/authorize'

export const authorize = {
  state: {
    logState: false,
    userInfo: { }
  },
  mutations: authorizeMutation,
  actions: authorizeAction
}
