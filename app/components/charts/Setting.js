import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'

class Setting extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

        var users = ['root','hui','chen'];
         var table = new TableT(users);
          var div =(
            <div className = "ui segment" id="settingSeg" >
                  <a className= "ui tag label" >  异常阈值设置 </a>
                  {table}
            </div>
          );

         return div;
    }
}
export default Setting;

var DropDownTime = function (value){
    var timepicker = new ReactFauxDOM.createElement('div');
     timepicker.appendChild( 
                <select className="ui dropdown">
                                    <option value= "0"> {value}</option>  
                                   <option value="1">1:00</option>
                                    <option value="2">2:00</option>
                                    <option value="3">3:00</option>
                                    <option value="4">4:00</option>
                                    <option value="5">5:00</option>
                                    <option value="6">6:00</option>
                                    <option value="7">7:00</option>
                                    <option value="8">8:00</option>
                                    <option value="9">9:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                    <option value="13">13:00</option>
                                    <option value="14">14:00</option>
                                    <option value="15">15:00</option>
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                    <option value="23">23:00</option>
                                    <option value="24">00:00</option>
                 </select> );      
    return timepicker.toReact();
}

var TimePeroidChoice = function(){
    var dropdownTime1 = new DropDownTime("From");
    var dropdownTime2 = new DropDownTime("To");
      var td = new ReactFauxDOM.createElement('div');
      td.setAttribute("class","timePicker");

      td.appendChild(
           <div className = "td_inline"> {dropdownTime1} </div>
        );
        td.appendChild(
               <p className = "td_inline"> to </p>
        );
        td.appendChild(  
           <div className = "td_inline">  {dropdownTime2} </div>
        );
      
    return td.toReact();
}

var OneRow = function(userName){
    var timePicker = new TimePeroidChoice();
    var tr = new ReactFauxDOM.createElement('tr');
    tr.setAttribute("key",userName);

    tr.appendChild(
                         <td>
                          <h2 className="ui center aligned header">{userName}</h2>
                        </td>
                        
    );
    tr.appendChild(
                         <td >
                            {timePicker}
                        </td>
    );
    tr.appendChild( <td>
                       <div className="ui input td_inline">
                            <input type="text" placeholder="Number" / >
                        </div>
                        <p className = "td_inline" > in </p>
                        <div className="ui input td_inline">
                            <input type="text" placeholder="Time Span" / >
                        </div>

                    </td>
    );
    tr.appendChild(

                         <td>
                            <div className="ui slider checkbox">
                                <input type="checkbox" className="newsletter" />
                                <label>On</label>
                             </div>
                         </td>
    );

    return tr.toReact();
}

var TableT = function (users){
    
    var table = new ReactFauxDOM.createElement('table');
    var tbody = new ReactFauxDOM.createElement('tbody');
    table.setAttribute("class", "ui celled padded table");
    for(var i = 0 ; i< users.length; i++){
        var oneRow = new OneRow(users[i]);
        tbody.appendChild(oneRow);
    }
    table.appendChild(
         <thead>
                    <tr>
                    <th className="single line">User</th>
                    <th>正常活跃时间</th>
                    <th>最大同类型操作数及其时间间隔</th>
                    <th>监控状态</th>
                    </tr>
        </thead>
    );
    table.appendChild(tbody);
    return table.toReact();
  
}