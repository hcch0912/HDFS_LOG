import React from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import Dashboard from './Dashboard';
import Logs from './Log';
import AnalysisPage from './AnalysisPage';
import MainStore from '../stores/MainStore';
import MainActions from '../actions/MainActions';
import Login from './Login';

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
        if(this.state.view == "login"){
          return (
            <Login />
        );
        }
        if(this.state.view == "dashboard" || this.state.view == "" || !this.state.view){
            currentView = <Dashboard />
        } 
        
        if(this.state.view == "logs_users" ){
            var logProps = {
              view: this.state.view
            }  
            currentView = <Logs {...logProps} />
        } 
        if(this.state.view == "analysis"){
          var AnaProps = {
              view: this.state.views
          }
            currentView = <AnalysisPage {...AnaProps} />
        }    
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