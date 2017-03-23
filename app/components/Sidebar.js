import React from 'react';
import {Link} from 'react-router';
import browserHistory from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'

// Apply the middleware to the store


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }
    handleClick(e){
        e.preventDefault();
        //console.log(e.target.id);
        let target = e.target.id
        if(target == "side_dsb"){
            this.props.changeView("dashboard");

        }
         if(target == "side_users"){
              this.props.changeView("logs_users")
        }
         if(target == "side_ana"){
              this.props.changeView("analysis")
        }
    } 

    render(){
        return (
            <section id = "sidebar" className = "ui visible sidebar">
                    <div id = "it" className="ui vertical icon menu">
                    <a className="item" id="side_dsb" onClick={this.handleClick.bind(this)}>
                       <i className="block layout icon"></i> 
                     Dashboard
                    </a>
                    <a className="item" id="side_users" onClick={this.handleClick.bind(this)} >
                        <i className="table icon"></i>
                        Logs
                    </a>
                    <a className="item" id="side_ana" onClick={this.handleClick.bind(this)} >
                        <i className="doctor icon"></i>
                         User Activity Analysis
                    </a>
                
                </div>
                <div className="pusher">
                    
                </div>
            </section>
        );
    }
}

export default Sidebar;