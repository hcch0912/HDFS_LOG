import React from 'react';
import LogStore from '../stores/LogStore';
import LogActions from '../actions/LogActions';
import HeaderBar from './HeaderBar';

class Log extends React.Component {
    constructor(props){
      super(props);
      this.state = LogStore.getState();
      this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        LogStore.listen(this.onChange);
        LogActions.getLogs(this.state.filters);
        LogActions.getUsers(this.state.users);
    }
    componentWillUnmount() {
        LogStore.unlisten(this.onChange);
    }
    componentDidUpdate(prevState){
         if (JSON.stringify(prevState.filter )!=JSON.stringify(this.state.filter)) {
             LogActions.getLogs(this.state.filers);
             LogActions.getUsers(this.state.users);
         }
    }
    onChange(state) {
        this.setState(state);
    }
    render(){
        var tableContent = this.state.logs.map(function(row,i){
            return(
              
                    <tr>
                        <td>{row.user} </td>
                        <td>{row.action}</td>
                        <td>{row.object}</td>
                        <td>{row.name} </td>
                        <td>{row.message}</td>
                        <td>{row.timestamp}</td>
                    </tr>
            );
        });
        var headerBarProps = {
           users : this.state.users,
           filters: this.state.filters
       }
        return (
            <section id = "log" className = "mainPanel">
                <HeaderBar {...headerBarProps}  />
                <div id = "logTable" className = "mainPanelBody">
                   <table className="ui celled table" >
                        <thead>
                            <tr><th>User</th>
                            <th>Action</th>
                            <th>Object</th>
                            <th> Name </th>
                            <th> Message </th>
                            <th> Time </th>
                        </tr></thead>
                         <tbody  >
                            {tableContent}
                        </tbody>
                        </table>
                    </div>
            </section>
        );
    }
}
export default Log;