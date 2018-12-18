import * as constants from '~/actions/constants'


const defaultState = {
	topmenu:null,
	sidemenu:null,
	menuActive:""
}

export default (state=defaultState,action) => {
	if(action.type === constants.SET_TOP_MENU){
		let newState = Object.assign({}, state);
		newState.topmenu = action.topmenu
		return newState

	}else if(action.type === constants.SET_SIDE_MENU){
		
			let newState = Object.assign({}, state);
			newState.sidemenu = action.sidemenu
			return newState
	
		
	}else if(action.type === constants.SET_MENU_ACTIVE){
		let newState = Object.assign({}, state);
		newState.menuActive = action.menuActive
		return newState
	}
	return state
}