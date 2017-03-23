import alt from '../alt';
import AnalysisActions from '../actions/AnalysisActions';


class AnalysisStore  {
    constructor(props){
        this.bindActions(AnalysisActions);
        this.userAnaData = [];
        this.setting = [];
        this.abnormalList = [];
    }
    onSetThresholdSuccess(data){
     
    }
    onSetThresholdFailed(jqXhr){
          toastr.error(jqXhr.responseJSON.message);
    }
    onGetAbnormalListSuccess(data){
        this.abnormalList = data;
    }
    onGetAbnormalListFailed(jqXhr){
         toastr.error(jqXhr.responseJSON.message);
    }
    onGetUserAnaDataSuccess(data){
        this.userAnaData = data;
    }
    onGetUserAnaDataFailed(jqXhr){
         toastr.error(jqXhr.responseJSON.message);
    }
}

export default alt.createStore(AnalysisStore);