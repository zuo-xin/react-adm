import * as constants from '~/actions/constants'
import util from '~/util/util'
const defaultState = {
	ssid:""
}

export default (state=defaultState,action) => {
	if(action.type === constants.SET_SSID){
		let newState = Object.assign({}, state);
			newState.ssid = action.ssid
		return newState

	}
	return state
}