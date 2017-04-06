import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(e){
        e.preventDefault();
        let target = e.target.id
        if(target == "head_logout"){
            this.props.changeView("login");
        }
    } 
    render(){
        return(
        <header id="header">
             <h1>Log Analysis</h1>
             <span className = "headerRight">
                <a > Hello, CH </a>
                <i className="sign out icon large" id="head_logout" onClick={this.handleClick.bind(this)}></i>
             </span>
        </header>
        );
    }
}
export default Header;