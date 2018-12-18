import React from 'react'
import { Checkbox,message } from 'antd';
import {connect} from 'react-redux'
import * as actions from '~/actions'
import {Redirect} from 'react-router-dom'
import './login.less'

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameValue:"",
			pwdValue:"",
			remname: true,
			rempwd: true
		};
		this.remnameChange = this.remnameChange.bind(this)
		this.rempwdChange = this.rempwdChange.bind(this)
		this.nameChange = this.nameChange.bind(this)
		this.pwdChange = this.pwdChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	remnameChange (e){
		e.stopPropagation();
		this.setState({
			remname: e.target.checked
		});
	}
	rempwdChange(e){
		e.stopPropagation();
		this.setState({
			rempwd: e.target.checked
		});
	}
	nameChange(e){
		e.stopPropagation();
		this.setState({
			nameValue: e.target.value
		});
	}
	pwdChange(e){
		e.stopPropagation();
		this.setState({
			pwdValue: e.target.value
		});
	}
	handleSubmit(e){
		e.preventDefault();
		if(!this.state.nameValue.replace(/\s/g, '')){
			message.error("请输入用户名");
			return 
		}
		if(!this.state.pwdValue.replace(/\s/g, '')){
			message.error("请输入密码");
			return 
		}
		this.props.login(this.state.nameValue.replace(/\s/g, ''),
		this.state.pwdValue.replace(/\s/g, ''))

	}

	render(){
		if(this.props.loginStatus){
			return <Redirect to="/" />
		}else{
			return (
				<div id="login">
					<form className="form" onSubmit = {this.handleSubmit}>
						<div className="logo"></div>
						<input type="text" className="inp username" onChange={this.nameChange}  placeholder="请输入用户名"/>
						<input type="password" className="inp pwd"  onChange={this.pwdChange} placeholder="请输入密码"/>
						<button type="submit">登录</button>
						<div className="bottom">
							<Checkbox checked={this.state.remname} onChange={this.remnameChange}>记住用户名</Checkbox>
							<Checkbox checked={this.state.rempwd} onChange={this.rempwdChange}>记住密码</Checkbox>
						</div>
					</form>
				</div>
			)
		}
		
	}
}

const mapState = (state) => ({
	loginStatus:state.loginstatus.loginStatus
})

const mapDispatch = (dispatch) => ({
	login(u,p){
		const action = actions.login(u,p);
		dispatch(action)
	}
})

export default connect(mapState,mapDispatch)(Login)