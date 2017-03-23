import alt from '../alt';
import DashboardActions from '../actions/DashboardActions';

class DashboardStore {
    constructor (props) {
        this.bindActions(DashboardActions);
        this.users = [];
        this.filters = [];
        this.heatMapData = [];
        this.barChartData = [];
        this.bubbleChartData = {"name":"",children:[]};
        this.lineChartData = [];
    }
    onGetUsersSuccess(data){
        this.users = data;
    }
    onGetUsersFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }
    onGetHeatMapDataSuccess(data){
        this.heatMapData = data.data;
    }
    onGetHeatMapDataFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }
    onGetBarChartDataSuccess(data){
        this.barChartData = data;
    }
    onGetBarChartDataFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }
    onGetBubbleChartDataSuccess(data){
        this.bubbleChartData = data;
    }
    onGetBubbleChartDataFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }
    onGetLineChartDataSuccess(data){
        this.lineChartData = data;
    }
    onGetLineChartDataFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }

}

export default alt.createStore(DashboardStore);