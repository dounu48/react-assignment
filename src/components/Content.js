import React, { Component }  from 'react';
import './Content.css';
import FontAwesome from 'react-fontawesome';
import './RadioButton.css';

class Content extends Component {
    constructor(props) {

        super(props);

        this.state = {
            categoryList : [
                          { key: 'cate1', name:"Enable", value:"enable", type:"category" },
                          { key: 'cate2', name:"Disable", value:"disable", type:"category" },
           ],
           content  : '',
           data : {}
        };

        this.selectContent = this.selectContent.bind(this);

    };

    componentDidMount() {

            this.setState ({
                data: this.props.data,
                content : this.props.data.content,
            });
    };

    componentWillReceiveProps(nextProps) {

        if (   this.props.data.content !== nextProps.data.content )  {

         this.setState({
                        data : nextProps.data,
                        content : nextProps.data.content,
                    });
        }

        };

    shouldComponentUpdate(nextProps, nextState) {
         if ( nextState.content === this.state.content   ) return false;
                this.props.onSetContent(nextState.content);
                return true;
    };

    selectContent(event) {

        this.setState ({
            content : event.target.value,
        });
    };

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-main-title">Content</div>
                <div className="content-main-content-wrapper">
                    <div className="content-main-content-title">Category lists</div>

                    <div className="content-main-content-appendix" >Automatically add Fancy items to the category lists </div>
                   <div className="radio-button-wrapper">
                       { this.state.categoryList.map((item) => (
                          <div key={item.key} className="radio-button">
                           <input key={item.key} type="radio" value={item.value} name={item.type}
                                checked={ this.state.content === item.value ? true : false  }
                              onClick={this.selectContent}
                            />
                             {item.value==='private' ? <div className="radio-button-private"> <FontAwesome className="fa fa-lock" name="lock" /></div>: '' }
                            {item.name}
                           </div>
                            ))}
                      </div>
                </div>
            </div>
        );
    }
}

export default Content;