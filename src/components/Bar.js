import React, { Component } from 'react';
import './Bar.css';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { preferenceGetRequest } from 'actions/preference';

class Bar extends Component {



    render() {
        return (
          <div>
            <div className="bar-icon-wrapper">
               <div className="bar-icon-content">
                <FontAwesome className="fa fa-user-circle-o" name="user-circle-o"/>
                <div className="bar-icon-title" >
                Edit Profile </div></div>
            </div>
            <div className="bar-icon-wrapper">
               <div className="bar-icon-content" onClick={this.readHander}>
                <FontAwesome className="fa fa-file-archive-o" name="file-archive-o"/>
                <div className="bar-icon-title" >
                Preferences </div>  </div>

             </div>

            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa fa-lock" name="lock"/>
                <div className="bar-icon-title" >Password</div></div>
            </div>
            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa-clock-o" name="clock-o"/>
                <div className="bar-icon-title" >Notifications</div></div>
            </div>
            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa-address-card-o" name="address-card-o" />
                <div className="bar-icon-title" >Connected Accounts</div></div>
            </div>

            <div className="bar-middle-line" />

            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa fa-list-alt" name="list-alt" />
                <div className="bar-icon-title" >Orders</div></div>
            </div>
            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa fa-credit-card" name="credit-card"/>
                <div className="bar-icon-title" >Payments</div></div>
            </div>
            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa fa-ship" name="ship"/>
                <div className="bar-icon-title" >Shipping</div></div>
            </div>

            <div className="bar-middle-line" />

            <div className="bar-icon-wrapper">
                <div className="bar-icon-content">
                <FontAwesome className="fa-usd" name="usd" />
                <div className="bar-icon-title" >Credits & Referrals</div></div>
            </div>
          </div>
        );
    }

}

 export default Bar;