import * as constants from '~/actions/constants'
const defaultState = {
	loginStatus:true
}

export default (state=defaultState,action) => {
	if(action.type === "CHANGE_LOGIN_STATUS"){
		let newState = Object.assign({}, state);
		newState.loginStatus = action.loginStatus;
		return newState
	}
	return state
}