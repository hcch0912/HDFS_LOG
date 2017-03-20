import React from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import Dashboard from './Dashboard';
import Logs from './Log';
import MainStore from '../stores/MainStore';
import MainActions from '../actions/MainActions';


class Main extends React.Component{
    constructor(props){
      super(props);
      this.state = MainStore.getState();
      this.onChange = this.onChange.bind(this);
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = MainStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        MainStore.listen(this.onChange);
        MainActions.gotoWhere();
    }
    componentWillUnmount() {
      MainStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }
    onChangeView(target){
      MainActions.gotoView(target);
    }
   render() {
       
        var currentView ;
        if(this.state.view == "dashboard" || this.state.view == "" || !this.state.view){
            currentView = <Dashboard />
        } 
        
        if(this.state.view == "logs_users" || this.state.view == "logs_files"){
            var logProps = {
              view: this.state.view
            }  
            currentView = <Logs {...logProps} />
        } 
        // if(this.state.view == "logs_files"){
        //     currentView = <Logs {...props} />
        // }    
        var sidebarProps = {
          changeView: this.onChangeView.bind(this),
        }   
        
        return (
          <div>
            <Header />
            <SideBar {...sidebarProps}/>
            {currentView}
          </div>
        );
  }
}

export default App;