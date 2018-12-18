import React from 'react'

import Aaa from './aaa'

class IndexHome extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		//const Aaa = require('./aaa');
		
		return(
			<React.Fragment>
				<Aaa />
			</React.Fragment>
		)
	}
}



export default IndexHome