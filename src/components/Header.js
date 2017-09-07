import React, {Component} from 'react';
import './Header.css';
import FontAwesome from 'react-fontawesome';
import Login from '../containers/Login';
import Modal from 'react-modal';

const styles = {
  content: {
    position: 'absolute',
    top: '27.8%',
    left: '34.4%',
    right: '34.4%',
    bottom: '50%',
    width: '500px',
    height: '200px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.3)',
  },
};

class Header extends Component {

     constructor (props) {
        super(props);

        this.state= {
            isOpen : false,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

     }

     openModal() {
        this.setState ({
            isOpen: true,
        })
     }

     closeModal() {
        this.setState ({
            isOpen: false,
        })
     }

    render() {

        const logInButton = (
                <div className="header-icon-image"  onClick={this.openModal} >
                    <FontAwesome className="fa fa-user" name="user" /></div>
        );

        const logoutButton = (
               <div className="header-icon-image"  onClick={this.props.onLogout}>
                    <FontAwesome className="fa fa-user-times" name="user-times" /> </div>
        );
        return(

            <div className="header-wrapper">
                <div className="header-search-box-wrapper">
                <div className="header-search-box-icon">
                    <FontAwesome className="fa fa-search" name="search"/> </div>
                    <input className="header-search-box"
                                       type="text"
                                       placeholder="Search Fancy"
                    />
                </div>
                <div className="header-main">FANCY</div>
                <div className="header-icon-wrapper">
                   <div className="header-icon-image">
                    <FontAwesome className="fa fa-shopping-cart" name="shopping-cart" /> </div>
                   <div className="header-icon-image">
                    <FontAwesome className="fa fa-folder" name="folder" /> </div>
                   <div className="header-icon-image">
                      <FontAwesome className="fa fa-location-arrow" name="location-arrow"/> </div>
                    <Modal
                        isOpen={this.state.isOpen}
                        shouldCloseOnOverlayClick={false}
                         onRequestClose={this.closeModal}
                         style={styles}
                          contentLabel="Login Modal"
                          >
                          <Login modalCloseHandler={this.closeModal} />

                        </Modal>
                          { this.props.isLoggedIn ? logoutButton : logInButton }

                </div>

            </div>
        );
    }
}

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
