import alt from '../alt';
import LogActions from '../actions/LogActions';

class LogStore {
    constructor (props) {
        this.bindActions(LogActions);
        this.users =[];
        this.filters = [];
        this.logs = [];
    }
    onGetUsersSuccess(data){
        this.users = data;
    }
    onGetUsersFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }    
    onGetLogsSuccess(data){
        this.logs = data;
    }
    onGetLogsFailed(jqXhr){
        toastr.error(jqXhr.responseJSON.message);
    }
}

export default alt.createStore(LogStore);