import alt from '../alt';

class MainActions {
    constructor(props){
    
        this.generateActions(
            'gotoWhere'
        );
    }
    gotoView(target){
        this.actions.gotoWhere(target);
    }
}
export default alt.createActions(MainActions);