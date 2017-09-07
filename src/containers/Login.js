import React, { Component } from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }


     handleLogin(id, pw) {

        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    this.props.modalCloseHandler();
                    return true;
                } else {
                    alert("invalid username or password");
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                 <Authentication mode={true}
                                onLogin={this.handleLogin}
                                onModalClose={this.props.modalCloseHandler}
                                />
            </div>
        );
    }
 }

const mapStateToProps = (state) => {
     return {
         status: state.authentication.login.status
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
         loginRequest: (id, pw) => {
             return dispatch(loginRequest(id,pw));
         }
     };
};

Login.propTypes = {
    modalCloseHandler: PropTypes.func.isRequired,
};

 export default connect(mapStateToProps, mapDispatchToProps)(Login);