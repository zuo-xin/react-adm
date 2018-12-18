import React from 'react'
import { Checkbox,message } from 'antd';
import {connect} from 'react-redux'
import * as actions from '~/actions'
import { NavLink,Link,Redirect } from 'react-router-dom'
import classnames from 'classnames'
import './topmenu.less'
import util from '~/util/util'
import {menus} from '~/util/menus'
class TopMenu extends React.Component{
	constructor(props){
		super(props);
		this.userClick = this.userClick.bind(this);
		this.logOut = this.logOut.bind(this)
		this.state = {
			usermenushow:false
		}
	}
	userClick(e){
		e.stopPropagation();
		this.setState((prevState, props) => ({
			usermenushow:!prevState.usermenushow
		}))
	}
	logOut(e){
		e.stopPropagation();
		this.props.logout()

	}
	componentDidMount(){
		var _this = this
		window.addEventListener("click",function(e){
			e.stopPropagation();
			_this.setState((prevState, props) => ({
				usermenushow:false
			}))
		})
		this.props.getLoginInfo()
	}
	render(){
		let navList = [],menu = this.props.menu;
		if(util.isNullObj(menu)){
			for(let attr in menu){
				let obj = {};
				if(util.isNullObj(menu[attr].children)){
					let childArr = Object.keys(menu[attr].children),
						childObj = menu[attr].children,
						index = childArr[0];
					let preAttr = childObj[index].url
					if(menus[preAttr]){
						obj.id = attr;
						obj.title = menu[attr].title;
						obj.url = (menus[preAttr]).url
						navList.push(obj)
					}
				}	
			}
		}
		this.props.settopmenu(navList)
		
		if(this.props.loginStatus){
			return (
				<div id="topmenu">
				<div className="left">
					<Link className="logo"  to="/"></Link>
					<div className="menu">{
						navList.map((item,index)=>{
							return (
								<NavLink to={item.url} key={item.id} className={classnames({"menuactive":item.id===this.props.menuActive})}>{item.title}</NavLink>
							)					
						})
					}
					</div>
				</div>
				<div className="user">
					<a href="javascript:;" onClick={this.userClick} className="name">{this.props.role_name}</a>
					<div className={classnames({"usermenushow":this.state.usermenushow,"usermenu":true})}>
						<a href="javascript:;" className="logininfo">用户信息</a>
						<a href="javascript:;" className="changepass">修改密码</a>
						<a href="javascript:;" className="logout" onClick={this.logOut}>退出</a>
					</div>
				</div>
			</div>)
		}else{
			return <Redirect to="/login" />
		}
	}
}

const mapState = (state) => ({
	loginStatus:state.loginstatus.loginStatus,
	role_name:state.logininfo.role_name,
	menu:state.logininfo.menu,
	menuActive:state.topmenu.menuActive
})

const mapDispatch = (dispatch) => ({
	getLoginInfo(){
		const action = actions.getLoginInfo();
		dispatch(action)
	},
	logout(){
		const action = actions.dispatchChangeLoginStatus(false);
		util.setCookie('ssid', '');
		dispatch(action)
	},
	settopmenu(navList){
		const action = actions.SetTopMenu(navList);
		dispatch(action)
	}
})

export default connect(mapState,mapDispatch)(TopMenu)