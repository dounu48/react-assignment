import React, { Component }from 'react';
import './Preference.css';
import Localization from './Localization';
import Privacy from './Privacy';
import Content from './Content';

class  Preference extends Component  {
   constructor(props) {
       super(props);

       this.state = {
            localizationList: { lauguage: '', timezone: '', currency: ''},
            privacyList : { privacy: '', messages: ''},
            content : '' ,
            preferences : { language: '',
                            timezone : '',
                            currency : '',
                            privacy : '',
                            messages : '',
                            content : '',
                            recentlyVisited:{},
                            },
            data: {},
            isRead: false,
       }

       this.save = this.save.bind(this);
       this.read = this.read.bind(this);
       this.edit = this.edit.bind(this);
       this.remove = this.remove.bind(this);
       this.setLocalization = this.setLocalization.bind(this);
       this.setPrivacy = this.setPrivacy.bind(this);
       this.setContent = this.setContent.bind(this);

   };

   componentDidMount() {
       this.read();
   };

   componentWillReceiveProps(nextProps) {
   console.log("this props : " + JSON.stringify(this.props));
   console.log("next props : " + JSON.stringify(nextProps));

   if (  nextProps.isRead !== this.props.isRead    )  {
            console.log("--- preference receives props ---");

            this.setState({
                data : nextProps.data ? nextProps.data : {},
                isRead: true,
            })
            this.forceUpdate();
        }

   };

   shouldComponentUpdate(nextProps, nextState ) {

       if ( nextState.localizationList === this.state.localizationList &&
           nextState.privacyList === this.state.privacyList &&
           nextState.content === this.state.content ) return false;

       return true;
   };

   read()  {
        const username = this.props.currentUser;
        if ( username.length !== 0 ) {
               this.props.read(username);
        }

   };

   edit() {

    const preferences = this.state.preferences;
    const username = this.props.currentUser;

   this.props.edit(username, preferences).then(() => {

     this.setState({   preferences:{ language: '',
                                   timezone : '',
                                   currency : '',
                                   privacy : '',
                                   message : '',
                                   content : '',
                                   recentlyVisited:{} },
                        username : username
         });
        });

   };

   save() {
        const preferences = this.state.preferences;

         this.props.save(preferences).then(() => {
             this.setState({
                  preferences:{ language: '',
                                timezone : '',
                                currency : '',
                                privacy : '',
                                messages : '',
                                content : '',
                                recentlyVisited:{},},
                  });});
    };

    remove() {
        const username = this.props.currentUser;
        if ( username.length !== 0  ) {
            this.props.remove(username);
        }
    };

   setLocalization(list) {
        this.setState({
            localizationList: list,
            preferences : { language : list.language,
                            timezone : list.timezone,
                            currency : list.currency,

                            privacy: this.state.privacyList.privacy,
                            messages : this.state.privacyList.messages,
                            content: this.state.content },
        });
   };

   setPrivacy(list) {
        this.setState({
            privacyList: list,
            preferences : { language : this.state.localizationList.language,
                            timezone : this.state.localizationList.timezone,
                            currency : this.state.localizationList.currency,

                            privacy: list.privacy,
                            messages : list.messages,
                            content: this.state.content },
        });

   };

   setContent(list) {
        this.setState({
           content: list,
            preferences : { language : this.state.localizationList.language,
                            timezone : this.state.localizationList.timezone,
                            currency : this.state.localizationList.currency,

                            privacy: this.state.privacyList.privacy,
                            messages : this.state.privacyList.messages,
                            content: list },
        });
   };

    render() {

    const delBtn = (
        <div className="preference-del-btn" onClick={this.remove}> Delete Preferences</div>

    );

    const saveBtn = (
         <div className="preference-save-btn" onClick={this.save}> Save Preferences</div>
    );

    const editBtn = (
         <div className="preference-edit-btn" onClick={this.edit}> Edit Preferences</div>

    );
 return (

  <div>
      <div className="preference-title" >
          Edit Preferences </div>

       <div className="preference-bar" />
       <div>
         <Localization onSetLocalization={this.setLocalization} data={this.state.data} />
        </div>

        <div className="preference-bar" />
        <div>
         <Privacy onSetPrivacy={this.setPrivacy} data={this.state.data} />
        </div>

        <div className="preference-bar" />
        <div>
          <Content onSetContent={this.setContent} data={this.state.data}/>
         </div>

         <div className="preference-bar" />
         <div className="preference-bar" />

          {this.state.isRead  ? editBtn : saveBtn }
          {this.state.isRead  ? delBtn : undefined }

    </div>
 );
 }
}

 export default Preference;
