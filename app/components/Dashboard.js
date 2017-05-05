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
                                <p> This chart shows the activity heat distribution through time line.
                                    Red represents higher density of activity 
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart ">
                                <BarChart {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">Actions Bar Chart (User Based)</a>
                                <p> This chart shows the accumulated action count for each user, 
                                    a cluster represents a kind of action with name on the axis,
                                    the counted numbers are represented by the length of the bars.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart">
                                <BubbleChart {...chartProps}  />
                                </div>
                                <div className="content">
                                <a className="header">Actions Bubble Chart</a>
                                <p>This charts shows the accumulated count results of each action. 
                                    The numbers of count are represented by the size of the bubble. 
                                    The bigger the bubble is, the more frequently the action has been done.
                                </p>
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
                                <p> This chart shows the activity density trend though time line.
                                    The x axis represents time, the y axis represents activity density count.
                                    Different lines represent different users.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid card">
                                <div className="image chart">
                                <img src ="http://localhost:3000/images/wordcloud1.png" />
                                </div>
                                <div className="content">
                                <a className="header"> Hot Spot Files</a>
                                <p> This chart shows the popularity of each file.
                                    The larger the lable in the cloud, the more frequently the file has been used or visited
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

        );
    }

}

export default Dashboard;