import alt from '../alt';

class AnalysisActions {
    constructor(){
        this.generateActions(
            'getUserAnaDataSuccess',
            'getUserAnaDataFailed',
            'setThresholdSuccess',
            'setThresholdFailed',
            'getAbnormalListSucccess',
            'getAbnormalListFailed'
        );
    }
    getUserAnaData () {
        var url = "/api/userAnaData";
        $.ajax({ url: url, data :""})
        .done((data) => {
            this.actions.getUserAnaDataSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getUserAnaDataFailed(jqXhr);
        });
    }
    getAbnormalList(){
        var url = "/api/abnormalList";
        $.ajax({ url: url, data :""})
        .done((data) => {
            this.actions.getAbnormalListSucccess(data);
        }).fail((jqXhr)=>{
            this.actions.getAbnormalListFailed(jqXhr);
        });
    }
    setThreshold(value){

    }
  
}
export default alt.createActions(AnalysisActions);