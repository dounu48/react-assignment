import React, { Component }  from 'react';
import './Privacy.css';
import './RadioButton.css';
import FontAwesome from 'react-fontawesome';

class Privacy extends Component {
    constructor(props) {
        super(props);

            this.state = {

                visibilityList: [
                        { key: 'pri1', name:"Everyone", value:"everyone" , type:"privacy" },
                        { key: 'pri2', name:"Private", value:"private" , type:"privacy" },
                ],

                messagesList: [
                         { key: 'mess1', name:"Everyone", value:"everyone" , type:"message"},
                         { key: 'mess2', name:"People you follow", value:"semiprivate", type:"message" },
                         { key: 'mess3', name:"No one", value:"private", type:"message" },
                ],
                privacy: '',
                messages: '',
                privacyList : { privacy: '', message: ''},
                data: {}

            };

            this.selectMessage = this.selectMessage.bind(this);
            this.selectPrivacy = this.selectPrivacy.bind(this);
    };

    componentDidMount() {

            this.setState ({
                data: this.props.data,
                privacy : this.props.data.privacy,
                messages : this.props.data.messages
            });
    };

    componentWillReceiveProps(nextProps) {

        if (  this.props.data.privacy !== nextProps.data.privacy ||
              this.props.data.messages !== nextProps.data.messages )
         {
          this.setState({
                        data : nextProps.data,
                        privacy : nextProps.data.privacy,
                        messages : nextProps.data.messages
                    });
        }

        };

    shouldComponentUpdate(nextProps, nextState) {
            if ( nextState.privacy === this.state.privacy &&
                 nextState.messages === this.state.messages  ) return false;

           this.props.onSetPrivacy (nextState.privacyList);
           return true;

    };

    selectMessage(event) {

        this.setState ({
            privacyList: { privacy: this.state.privacy, messages: event.target.value},
            messages: event.target.value,
        });

    };

    selectPrivacy(event) {

        this.setState ({
              privacyList: { privacy: event.target.value, messages: this.state.messages},
              privacy : event.target.value,
         });
    };

    render() {
        return (
            <div className="privacy-wrapper">
               <div className="privacy-main-title"> Privacy </div>

               <div className="privacy-main-content-wrapper">
                   <div className="privacy-main-content-title" >Profile visibility </div>
                   <div className="privacy-main-content-appendix">Manage who can see your activity, things you fancy, your followers, people you follow or in anyones search results </div>
                   <div className="radio-button-wrapper">
                       { this.state.visibilityList.map((item) => (
                          <div key={item.key} className="radio-button">
                           <input key={item.key} type="radio" value={item.value} name={item.type}  checked={ this.state.privacy === item.value ? true : false  }
                              onClick={this.selectPrivacy}
                            />
                             {item.value==='private' ? <div className="radio-button-private"> <FontAwesome className="fa fa-lock" name="lock" /></div>: '' }
                            {item.name}
                           </div>
                            ))}
                      </div>

                   <div className="privacy-main-content-title" >Messages</div>
                   <div className="privacy-main-content-appendix">Control who can send you messages </div>
                <div className="radio-button-wrapper">
                       { this.state.messagesList.map((item) => (
                          <div key={item.key} className="radio-button">
                           <input key={item.key} type="radio" value={item.value} name={item.type}  checked={ this.state.messages === item.value ? true : false  }
                              onClick={this.selectMessage}
                            />
                             {item.value==='private' ? <div className="radio-button-private"> <FontAwesome className="fa fa-lock" name="lock" /></div>: '' }
                            {item.name}
                           </div>
                            ))}
                      </div>

                   <div className="privacy-main-content-title" >Recently viewed</div>
                   <div className="privacy-main-content-appendix">Manage your Fancy browsing history </div>

                   <div className="privacy-main-delete-btn">Delete all items </div>
                </div>

            </div>
        );
    }
}

export default Privacy;
