import alt from '../alt';

class LogActions{
    constructor(){
        this.generateActions(
            "getUsersSuccess",
            "getUsersFailed",
            'getLogsSuccess',
            'getLogsFailed'
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
    getLogs(target,filters){
        let url = '/api/logs';
        let params = {
            type:target, 
            filters: filters
        }
        $.ajax({ url: url, data:params})
        .done((data) => {
            this.actions.getLogsSuccess(data);
        }).fail((jqXhr)=>{
            this.actions.getLogsFailed(jqXhr);
        });
    }

}

export default alt.createActions(LogActions);