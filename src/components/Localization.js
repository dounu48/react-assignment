import React, { Component }  from 'react';
import './Localization.css';
import PropTypes from 'prop-types';
import './ComboBox.css';

class Localization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            languageList: [{ key: 'lang1', name: 'English', value: 'English', type:"language"  },
                       { key: 'lang2', name: 'Korea', value: 'Korea', type:"language" },
                       { key: 'lang3', name: 'Chinese', value: 'Chinese', type:"language" },
                       { key: 'lang4', name: 'French', value: 'French', type:"language" }],
            timezoneList: [{ key: 'time1', name: '(UTC+00:00) UTC', value: 'utc'  },
                       { key: 'time2', name: 'KST', value: 'kst' , type:"timezone" },
                       { key: 'time3', name: '(UTC+08:00) CST', value: 'cst' , type:"timezone" },
                       { key: 'time4', name: 'GST (Global Standard Time)', value: 'gst', type:"timezone"  }],
            currencyList: [{ key: 'curr1', name: 'U.S. dollars($)', value: 'dollar' , type:"currency"},
                       { key: 'curr2', name: 'Korea Won', value: 'kwon' , type:"currency"},
                       { key: 'curr3', name: 'Chinese Won', value: 'cwon'  , type:"currency"},
                       { key: 'curr4', name: 'French Euro', value: 'euro'  , type:"currency"}],

            language: '',
            timezone: '',
            currency: '',
            data: {},
            localizationList: { language: '', timezone: '', currency: ''} // default setting
        };

        this.selectLanguage = this.selectLanguage.bind(this);
        this.selectTimezone = this.selectTimezone.bind(this);
        this.selectCurrency = this.selectCurrency.bind(this);
    };

    componentDidMount() {

                this.setState ({
                    data: this.props.data,
                    language : this.props.data.language,
                    timezone : this.props.data.timezone,
                    currency : this.props.data.currency
                });

            };


    componentWillReceiveProps(nextProps) {

        if (  this.props.data.language !== nextProps.data.language ||
             this.props.data.timezone != nextProps.data.timezone ||
             this.props.data.currency != nextProps.data.currency
            )  {
             this.setState({
                        data : nextProps.data,
                        language: nextProps.data.language,
                        timezone: nextProps.data.timezone,
                        currency : nextProps.data.currency
                    });
        }
    };


    shouldComponentUpdate(nextProps, nextState) {

        if ( nextState.language === this.state.language &&
             nextState.timezone === this.state.timezone &&
             nextState.currency  === this.state.currency) return false;

        this.props.onSetLocalization(nextState.localizationList);
        return true;
    };


    selectLanguage(event) {
        this.setState  ({
            localizationList: { language: event.target.value,
                                timezone: this.state.timezone,
                                currency : this.state.currency},
            language: event.target.value,});

        this.props.onSetLocalization(this.state.localizationList);
    };

    selectTimezone(event) {
        this.setState({
            localizationList: { language: this.state.language,
                                timezone: event.target.value,
                                currency : this.state.currency},
            timezone: event.target.value,});
     };

    selectCurrency(event) {

        this.setState({
         localizationList: { language: this.state.language,
                             timezone: this.state.timezone,
                             currency : event.target.value },
         currency : event.target.value,});
    };

    render() {
        return (
            <div className="local-wrapper">
               <div className="local-main-title"> Localization </div>

               <div className="local-main-content-wrapper">
                    <div className="local-main-content-title" >Language </div>
                    <select className="combo-box-wrapper" onChange={this.selectLanguage} value={  this.state.language ? this.state.language : '' } >

                        {this.state.languageList.map((item ) =>
                           <option key={item.key} value={item.value}>{item.name}</option>
                        )}
                        </select>

                    <div className="local-main-content-appendix">Interested in helping translate Fancy?
                     <a>   let us know </a>
                     </div>

                    <div className="local-main-content-title" >Time zone </div>
                    <select className="combo-box-wrapper" onChange={this.selectTimezone} value={ this.state.timezone ? this.state.timezone : '' }>
                    {this.state.timezoneList.map((item ) =>
                       <option key={item.key} value={item.value} selected={item.isSelected} >{item.name}</option>
                        )} </select>

                    <div className="local-main-content-title" >Currency </div>
                    <select className="combo-box-wrapper" onChange={this.selectCurrency} value={this.state.currency ? this.state.currency : '' }>
                    {this.state.currencyList.map((item ) =>
                        <option key={item.key} value={item.value} selected={item.isSelected} >{item.name}</option>
                        )} </select>

               </div>
            </div>
        );
    }
}

Localization.propTypes = {
    onSetLocalization: PropTypes.func.isRequired,
}

export default Localization;
