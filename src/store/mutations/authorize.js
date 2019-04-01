const authorizeMutation = {
  LOGIN_SUCCESS (state, action) {
    state.logState = true
    state.userInfo = action.data
  },
  LOGIN_FAILURE (state, action) {
    state.logState = false
  }
}

export { authorizeMutation }
