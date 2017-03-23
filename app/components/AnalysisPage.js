import React from 'react';
import AnalysisStore from '../stores/AnalysisStore';
import AnalysisActions from '../actions/AnalysisActions';
import UserAnalysisChart from './charts/UserAnalysisChart'
import Setting from './charts/Setting';
import Abnormal from './charts/Abnormal';

class AnalysisPage extends React.Component{

    constructor(props){
        super(props);
        this.state = AnalysisStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount(){
          AnalysisActions.getUserAnaData();
           AnalysisActions.getAbnormalList();
    }
    componentDidMount(){
        AnalysisStore.listen(this.onChange);
        // AnalysisActions.getUserAnaData();
        // AnalysisActions.getAbnormalList();
    }
    componentWillUnmount() {
      AnalysisStore.unlisten(this.onChange);
    }

     onChange(state){
        this.setState(state);
    }
    render(){
        var UserAnalysisProps = {
            userAnaData : this.state.userAnaData
        }
        var settingProps = {
            settings :  this.state.settings
        }
        var abnormalProps = {
            abnormalList: this.state.abnormalList
        }

        return(
            <section className = "ui segment" id = "analysisPage" >
                  <a className= "ui tag label" > 用户常用行为 </a>
                  <UserAnalysisChart  {...UserAnalysisProps} />
                  <Setting  {...settingProps}  />
                  <Abnormal {...abnormalProps}  />
            </section>
        );
    }
}


export default AnalysisPage;

/*class ThresholdSet extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        <div className = "ui segment" id = "thresholdSettting" >

        </div>
    }
}
export default ThresholdSet;*/
