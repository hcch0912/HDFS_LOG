import alt from '../alt';

class DashboardActions{
    constructor(){
        this.generateActions(
            "getUsersSuccess",
            "getUsersFailed",
            'getHeatMapDataSuccess',
            'getHeatMapDataFailed',
            "getBarChartDataSuccess",
            "getBarChartDataFailed",
            "getBubbleChartDataSuccess",
            "getBubbleChartDataFailed",
            "getLineChartDataSuccess",
            "getLineChartDataFailed",

        );
    }
    getUsers(target,filters){
        let url = '/api/users';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getUsersSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getUsersFailed(jqXhr);
        });
    }
    getHeatMapData(target,filters){
        let url = '/api/heatMapData';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getHeatMapDataSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getHeatMapDataFailed(jqXhr);
        });
    }
    getBarChartData(target,filters){
        let url = '/api/barChartData';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getBarChartDataSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getBarChartDataFailed(jqXhr);
        });
    }
    getBubbleChartData(target,filters){
        let url = '/api/bubbleChartData';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getBubbleChartDataSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getBubbleChartDataFailed(jqXhr);
        });
    }
    getLineChartData(target,filters){
        let url = '/api/lineChartData';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getLineChartDataSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getLineChartDataFailed(jqXhr);
        });
    }


}

export default alt.createActions(DashboardActions);