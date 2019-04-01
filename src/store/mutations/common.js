const commonMutation = {
	COMMON_SUCCESS (state, action) {
    state[action.sign] = {...state[action.sign]}
    state[action.sign] = action.data.data || action.data.info
  },
  COMMON_FAILURE (state, action) {
    state[action.sign] = {...state[action.sign]}
  }
}

export { commonMutation }
