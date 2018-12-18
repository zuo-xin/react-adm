import React from 'react'
import { Checkbox,message } from 'antd';
import {connect} from 'react-redux'
import * as actions from '~/actions'
import { NavLink,Link,Redirect,withRouter } from 'react-router-dom'
import classnames from 'classnames'
import './sidemenu.less'
import util from '~/util/util'
import {menus} from '~/util/menus'
import SideLink from './sidelink'


class SideMenu extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
		// let menu = this.props.menu,
		// 	pathname = this.props.location.pathname;
		// for(let attr1 in menu){
		// 	console.log(attr1)
		// 	let childMenu = menu[attr].children;

		// 	for(let attr2 in childMenu){
		// 		console.log(attr1)
		// 	}
		// }
	}
	componentDidUpdate(nextProps){
		let routePath = this.props.location.pathname,
			menu = this.props.menu;
		for(let attr in menu){
			let menuActive = attr,
				menuChild = (menu[attr]).children;
			for(let attr2 in menuChild){
				let childUrl = menuChild[attr2].url;
				if(menus[childUrl] && ((menus[childUrl]).url) === routePath){
					this.props.setMenuActive(menuActive);
					return
				}
			}

		}
	}
	render(){
		let menu = this.props.menu,topmenu = this.props.topmenu;
		if(topmenu.length){
			return(
				<div id="sideMenu">
					{topmenu.map((item,index) =>{
						let childObj = (menu[item.id]).children;
						return (
								<div className={classnames({"showdiv":item.id === this.props.menuActive})} key={item.id}>
									<div className="title">{item.title}</div>
										<SideLink menus={menus} routeUrl={this.props.location.pathname} childObj={childObj}/>
									
								</div>
						)
					})}
				</div>
			)
		}else{
			return(
				<div id="sideMenu">
	
				</div>
			)
		}		
	}
	
}

const mapState = (state) => ({
	menu:state.logininfo.menu,
	topmenu:state.topmenu.topmenu,
	menuActive:state.topmenu.menuActive
})

const mapDispatch = (dispatch) => ({
	setMenuActive(str){
		const action = actions.SetMenuActive(str);
		dispatch(action)
	}
})

export default withRouter(connect(mapState,mapDispatch)(SideMenu))