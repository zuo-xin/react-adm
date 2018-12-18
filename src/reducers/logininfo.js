import * as constants from '~/actions/constants'


const defaultState = {
	username:"",
	truename:"",
	role_name:"",
	menu:[]
}

export default (state=defaultState,action) => {
	if(action.type === constants.SET_LOGOIN_INFO){
		let newState = Object.assign({}, state);
		newState.username = action.username,
		newState.truename = action.truename,
		newState.role_name = action.role_name,
		newState.menu = action.menu
		return newState

	}
	return state
}