const recordMutation = {
	RECORD_SUCCESS (state, action) {
    state[action.sign] = {...state[action.sign]}
    state[action.sign] = action.data.data || action.data.info
  },
  RECORD_FAILURE (state, action) {
    state[action.sign] = {...state[action.sign]}
  }
}

export { recordMutation }
