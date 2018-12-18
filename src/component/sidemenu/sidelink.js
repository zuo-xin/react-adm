import React from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
class SideLink extends React.Component{
	constructor(props){
		super()
	}
	render(){
		let {menus,childObj,routeUrl}  = this.props;
		let keyArr = Object.keys(childObj);
		
		return (
			<React.Fragment>
				{
					keyArr.map((item,index) => {
						let childItem = childObj[item];
						let url = childItem.url
						if(menus[url]){
							return (
								<Link key={childObj[item].url} className={classnames({"sidemenuActive":routeUrl === menus[url].url})} to={menus[url].url}>{childObj[item].title}</Link>
							)
						}
						
					})
				}
			</React.Fragment>
		)

		
	}
}

export default SideLink