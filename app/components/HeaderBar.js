import React from 'react';

class HeaderBar extends React.Component{
    constructor(props){
        super(props);
        
    }
    handleClickGo(){
        this.props.rerenderWithFilter();
    }
    
    handleKeyPress(target) {
        if(target.charCode==13){
                alert('Enter clicked!!!');    
        }
    }
    render(){

         var usersOptions = this.props.users.map(function(user){
            return ( <option value="{user}"> {user} </option>) 
        });
        return(
        <div id = "dsHeader"  className = "mainPanelHeader">
                    <div className="ui  menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..."  onKeyPress={this.handleKeyPress} />
                                <i className="search icon"></i>
                            </div>
                        </div>
                        <div className="item">
                            
                        </div>
                        <div className="item">
                            <select className="ui dropdown">
                                <option value="0">  Time Peroid  </option>
                                <option value="1">Last 1 hour</option>
                                <option value="2">Last 6 hour</option>
                                <option value="3">Last 12 hour</option>
                                <option value="4">Last 1 day</option>
                                <option value="5">Last 2 days</option>
                                <option value="6">Last 7 days</option>
                                <option value="7">Last 30 days</option>
                                <option value="8">All </option>
                            </select> 
                        </div>
                        <div className="item">
                            <select className="ui dropdown">
                                {
                                usersOptions
                                }
                            </select>
                        </div>
                        <div className="item">
                            <div className="ui primary button" onClick={this.handleClickGo.bind(this)} >Go</div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default HeaderBar;