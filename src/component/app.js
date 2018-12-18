import React from 'react';
import store from '~/store'
import {Provider} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Login from '~/component/login/login'
import TopMenu from '~/component/topmenu/topmenu'
import SideMenu from '~/component/sidemenu/sidemenu'

import Pages from './pages'
import IndexHome from './indexhome'
import './app.less'
class App extends React.Component{
	render(){
		return (
			<Provider store={store}>
				<React.Fragment>
					<BrowserRouter>
						<React.Fragment>
							<TopMenu />
							<SideMenu />
							<Route exact path="/" component={IndexHome} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/aaa" render={props => {
								console.log(props)
								return(
								<IndexHome />
							)}} />
							<Pages />
						</React.Fragment>
					</BrowserRouter>
				</React.Fragment>
			</Provider>
		)
	}
}

export default App