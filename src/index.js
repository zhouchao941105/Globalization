import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Input, Button, Icon } from 'antd'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from './net'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    //登录
    login() {
        axios.get('/login', {
            params:
            {
                name: this.state.username,
                password: this.state.password
            }
        }
        ).then(res => {

            if (res) {

                window.location.href = "/home"
            }
        })
    }
    render() {
        return <div className="container" >
            <div className="loginContainer" >
                <div className="marT30" >
                    <div className="leftTitle" >
                        <span>用户名：</span></div><Input prefix={<Icon type="user" style={{ color: '#19da9c' }} />} value={this.state.username} style={{ width: 120 }} onChange={(e) => this.setState({ username: e.target.value })} />
                </div>
                <div className="marT30" >
                    <div className="leftTitle">
                        <span>密码：</span></div><Input prefix={<Icon type="lock" style={{ color: '#19da9c' }} />} style={{ width: 120 }} type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <Button className="marT30" icon="login" onClick={() => this.login()}>登录</Button>
            </div>
        </div>
    }
}
ReactDOM.render(
    <Router>
        <Switch>
            <Redirect path="/" exact to="/login"></Redirect>

            <Route path="/home" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>, document.getElementById('root'));
registerServiceWorker();
