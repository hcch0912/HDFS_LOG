import React from 'react';
import MainStore from '../store/MainStore';
import MainActions from '../actions/MainActions';


class Main extends React.Component{
    constructor(props){
      super(props);
      this.state = MainStore.getState();
      this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        MainStore.listen(this.onChange);
        MainActions.gotoWhere();
    }
    onChange(state){
        this.setState(state);
    }
    render(){
        var currentView ;
        if(this.state.view == "dashboard"){
            currentView = <Dashboard {...props}/>
        } 
        if(this.state.view == "logs_users"){
            currentView = <Logs {...props} />
        } 
        if(this.state.view == "analysis"){
            currentView = <UserAnalysis {...props} />
        }         
        return(
            {currentView}
        );
    }
}
export default Main;