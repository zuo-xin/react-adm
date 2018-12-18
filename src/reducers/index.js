import {combineReducers} from 'redux'

import login from './login'
import loginstatus from './loginstatus';
import logininfo from './logininfo'
import topmenu from './topmenu'


const reducer = {
	login,
	loginstatus,
	logininfo,
	topmenu
}

export default combineReducers(reducer)