import React from 'react'
import {Route} from 'react-router-dom'

class Pages extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Route exact path="/aaa" render={props => (
								
								<div>aaa</div>
							)} />
							<Route exact path="/bbb" render={props => (
								
								<div>bbb</div>
							)} />
			</div>
		)
	}
}

export default Pages