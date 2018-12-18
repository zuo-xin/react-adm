import util from '~/util/util'
import * as  constants from './constants'
import {Redirect} from 'react-router-dom'
import {message} from 'antd'



const setSsid = (s) => ({
	type:constants.SET_SSID,
	value:s
})

const changeLoginStatus = (status) => ({
	type:"CHANGE_LOGIN_STATUS",
	loginStatus:status
})

export const dispatchChangeLoginStatus = (status) => {
	return({
	type:"CHANGE_LOGIN_STATUS",
	loginStatus:status
})}

export const SetMenuActive = (str) => {
	return({
	type:constants.SET_MENU_ACTIVE,
	menuActive:str
})}

export const SetTopMenu = (arr) => ({
	type:constants.SET_TOP_MENU,
	topmenu:arr
})

export const SetSideMenu = (arr) => ({
	type:constants.SET_SIDE_MENU,
	sidemenu:arr
})

const setLoginInfo = (u,t,r,m) => {
	return ({
	type:constants.SET_LOGOIN_INFO,
	username:u,
	truename:t,
	role_name:r,
	menu:m
})}


export const login = (u,p) =>{
	return (dispatch) => {
		util.ajaxSubmit({
			url:"/api/api/login",
			data:{
				username:u,
				password:p
			},
			success(r){
				message.success(r.msg)
				dispatch(setSsid(r.ssid));
				dispatch(changeLoginStatus(true))
				dispatch(dispatchGetLoginInfo())
			},
			error(r){
				message.error(r.msg);
				if(r.ret === 402){
					dispatch(setSsid(""));
					dispatch(changeLoginStatus(false))
				}
				
			}
		})
	}
}

export const getLoginInfo = () =>{
	return (dispatch) =>{
		util.ajaxSubmit({
			url:"/api/api/loginInfo",
			success(r){
				message.success(r.msg)
				dispatch(changeLoginStatus(true))
				dispatch(setLoginInfo(r.data.list.user.username,r.data.list.user.truename,r.data.list.user.role_name,r.data.list.user.acl.adm.children));
			},
			error(r){
				message.error(r.msg);
				if(r.ret === 402){
					dispatch(setSsid(""));
					dispatch(changeLoginStatus(false))
				}
				dispatch(setLoginInfo("","","",null));
			}
		})
	}
}

const dispatchGetLoginInfo = () =>{
	return (dispatch) =>{
		util.ajaxSubmit({
			url:"/api/api/loginInfo",
			success(r){
				message.success(r.msg)
				//dispatch(changeLoginStatus(true))
				dispatch(setLoginInfo(r.data.list.user.username,r.data.list.user.truename,r.data.list.user.role_name,r.data.list.user.acl.adm.children));
			},
			error(r){
				message.error(r.msg);
				if(r.ret === 402){
					dispatch(setSsid(""));
					dispatch(changeLoginStatus(false))
				}
				dispatch(setLoginInfo("","","",null));
			}
		})
	}
}