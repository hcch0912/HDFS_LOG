import React from 'react';
import DashboardStore from '../stores/DashboardStore';
import DashboardActions from '../actions/DashboardActions';
import HeaderBar from './HeaderBar';
import HeatMap from './charts/HeatMap';
import BarChart from './charts/BarChart';
import BubbleChart from './charts/BubbleChart';
import LineChart from './charts/LineChart';
import HotpotFile from './charts/HotpotFile';

class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = DashboardStore.getState();
        this.onChange  = this.onChange.bind(this);
       
    }
    componentDidMount() {
        DashboardStore.listen(this.onChange);
        DashboardActions.getUsers(this.state.filters);
        DashboardActions.getHeatMapData(this.state.filters);
        DashboardActions.getBarChartData(this.state.filters);
        DashboardActions.getBubbleChartData(this.state.filters);
        DashboardActions.getLineChartData(this.state.filters);
    }
    componentWillUnmount() {
        DashboardStore.unlisten(this.onChange);
    }
    componentDidUpdate(prevState){
         if (JSON.stringify(prevState.filter )!=JSON.stringify(this.state.filter)) {
             DashboardActions.getUsers(this.state.filters);
             DashboardActions.getHeatMapData(this.state.filers);
             DashboardActions.getBarChartData(this.state.filers);
             DashboardActions.getBubbleChartData(this.state.filters);
             DashboardActions.getLineChartData(this.state.filters);
         }
    }
    onChange(state) {
        this.setState(state);
    }
    handleClickGo(){
        console.log("gogogog");
    }
    render(){
       var chartProps = {
            heatMapData:this.state.heatMapData,
            barChartData : this.state.barChartData,
            bubbleChartData : this.state.bubbleChartData,
            lineChartData : this.state.lineChartData,
        }
       var headerBarProps = {
           users : this.state.users,
           filters: this.state.filters
       }
        return(
             <section id = "dashboard" className="mainPanel" >
                <HeaderBar {...headerBarProps}  />
                <div id = "dsPanel" className = "mainPanelBody">
                    <div className="ui two column grid">
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart"  >
                                    <HeatMap  { ...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">User Activity Heatmap (Time Based)</a>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart ">
                                <BarChart {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">Activity Calculation Chart (User Based)</a>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart">
                                <BubbleChart {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">Activity Density Bubble Chart</a>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart">
                                <LineChart {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">Activity Line Chart</a>
                                </div>
                            </div>
                        </div>
                        {/*<div className="column">
                            <div className="ui fluid card">
                                <div className="image chart">
                                <HotpotFile {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header"> Hot Spot Files</a>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
                </section>

        );
    }

}

export default Dashboard;