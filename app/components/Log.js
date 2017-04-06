import React from 'react';
import ReactTable from 'react-table';
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
        var data = this.state.logs;
        var columns = [{
            header:'User',
            accessor:'user',
            filterMethod: (filter, row) => (row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value))
        },{
            header:'Action',
            accessor:'action',
            filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
        },{
            header:'Object',
            accessor: 'object',
            filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
        },{
            header:'Name',
            accessor:'name',
            filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
        },{
            header:'Message',
            accessor:'message',
            filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
        },{
            header:'Time',
            accessor:'timestamp',
            filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
        }
        ];
  
        var headerBarProps = {
           users : this.state.users,
           filters: this.state.filters
       }
        return (
            <section id = "log" className = "mainPanel">
                <HeaderBar {...headerBarProps}  />
                <div id = "logTable" className = "mainPanelBody">
            
                        <ReactTable
                         data = {data}
                         columns = {columns}
                         defaultFilterMethod={(filter, row) => (String(row[filter.id]) === filter.value)}
                        />
                    </div>
            </section>
        );
    }
}
export default Log;