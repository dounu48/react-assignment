import React, { Component }from 'react';
import './Authentication.css';
import PropTypes from 'prop-types';

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.onModalClose();
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
            let id = this.state.username;
            let pw = this.state.password;

            this.props.onLogin(id, pw).then(
                (success) => {
                    if(!success) {
                        this.setState({
                            password: ''
                        });
                    }
                }
            );
        }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-text-wrapper">
                    <label className="login-title">Username</label>
                    <input className="login-text"
                    onChange={this.handleChange}
                    value={this.state.username}
                    name="username"
                    type="text"/>
                </div>
                <div className="login-text-wrapper">
                    <label className="login-title">Password</label>
                    <input className="login-text"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name="password"
                    type="password" />
                </div>

                <button className="login-btn" onClick={this.handleLogin}>Login</button>
                <button className="cancel-btn" onClick={this.closeModal}>Cancel</button>

            </div>
        );
    }
}


Authentication.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};

export default Authentication;