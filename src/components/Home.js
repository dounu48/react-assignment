import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { preferencePostRequest , preferenceGetRequest, preferenceRemoveRequest, preferenceEditRequest  } from '../actions/preference';
import Bar from './Bar';
import Preference from './Preference';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRead: false,
        };

        this.saveHandler = this.saveHandler.bind(this);
        this.readHandler = this.readHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
    };

    editHandler(username, preferences ) {
        return this.props.preferenceEditRequest(username, preferences).then(() => {

                if (this.props.editStatus.status==="SUCCESS") {
                     alert('Edit Success!');
                    this.readHandler(username);

                } else {
                    /*
                        ERROR CODES
                            1: INVALID ID,
                            2: EMPTY CONTENTS
                            3: NOT LOGGED IN
                            4: NO RESOURCE
                            5: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'Please write soemthing',
                        'You are not logged in',
                        'That memo does not exist anymore',
                        'You do not have permission'
                    ];

                    let error = this.props.editStatus.error;

                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if( this.props.editStatus.error === 3) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }

                }
            }
        );

    };

    readHandler( username ) {
        this.props.preferenceGetRequest(username).then(() => {
               console.log("=== get preference : " + JSON.stringify(this.props.preferenceData));

                if ( this.props.preferenceData ) {
                this.setState({
                        isRead: true,
                    });
          } else {
            this.setState({
             isRead: false,
            });
          }
       });
    };

    removeHandler( username ) {
        this.props.preferenceRemoveRequest(username ).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
                alert("Removed ");
                this.readHandler(username);

            } else {
                if(this.props.removeStatus.error === 2) {
                    setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    };

    saveHandler(preferences) {
       return this.props.preferencePostRequest(preferences).then(
                () => {
                    if(this.props.postStatus.status === "SUCCESS") {
                        alert("Save Success");

                        this.readHandler( this.props.currentUser);

                    } else {
                        /*
                            ERROR CODES
                                1: NOT LOGGED IN
                                2: EMPTY CONTENTS
                        */
                        switch(this.props.postStatus.error) {
                            case 1:
                                alert("You are not logged in");
                                break;
                            case 2:
                                alert("you need something to write");
                                break;
                            default:
                                alert("Something Broke");
                                break;
                        }
                    }
                }
            );
    };

    render() {
       const main = (
         <div>
            <div className="main-side-bar">
               <Bar />
             </div>
            <div className="main-preference">
                <Preference save = {this.saveHandler}
                            remove = {this.removeHandler}
                            read = {this.readHandler}
                            edit = {this.editHandler}
                            isRead = {this.state.isRead}
                            data = {this.props.preferenceData}
                            currentUser={this.props.currentUser}/>
            </div>
         </div>
       );

        return (
            <div className= "main-wrapper">
            {this.props.isLoggedIn ? main  : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.preference.post,
        currentUser: state.authentication.status.currentUser,
        preferenceData: state.preference.get.data,
        removeStatus: state.preference.remove,
        editStatus: state.preference.edit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        preferencePostRequest: (preferences) => {
            return dispatch(preferencePostRequest(preferences));
        },
        preferenceGetRequest: ( username ) => {
            return dispatch(preferenceGetRequest( username));
        },
        preferenceRemoveRequest: ( username ) => {
            return dispatch(preferenceRemoveRequest(username ));
        },
        preferenceEditRequest: (username, preferences) => {
            return dispatch(preferenceEditRequest(username, preferences));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps  )(Home);


