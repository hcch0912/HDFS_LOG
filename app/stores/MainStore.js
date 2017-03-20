import alt from '../alt';
import MainActions from  '../actions/MainActions';

class MainStore {
    constructor(props){
        this.bindActions(MainActions);
        this.view = "";
    }
    
    onGotoWhere(target){
        this.view = target;
    }
   
}

export default alt.createStore(MainStore);