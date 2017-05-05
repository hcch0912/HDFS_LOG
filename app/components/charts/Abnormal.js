import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'

class Abnormal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
         var abnormalList = [
            {"user":"root", "action": "删除所有数据", "object":"VectorData","timestamp":"2017-03-01 14:15:39","count":332},
            {"user":"root", "action": "删除数据", "object":"矢量数据","timestamp":"2017-03-01 14:25:40","count":29},
        ]
        var table = new TableT(abnormalList);
         var div =(
            <div className = "ui segment" id="abnormalSeg" >
                  <a className= "ui tag label" > 最近异常 </a>
                  {table}
            </div>
          );

         return div;
    }
}
export default Abnormal;

var TableT = function (abnormalList){
    
    var table = new ReactFauxDOM.createElement('table');
    var tbody = new ReactFauxDOM.createElement('tbody');
    table.setAttribute("class", "ui celled padded table");
    for(var i = 0 ; i< abnormalList.length; i++){
        var oneRow = new OneRow(abnormalList[i],i);
        tbody.appendChild(oneRow);
    }
    table.appendChild(
         <thead>
                    <tr>
                    <th className="single line">User</th>
                    <th>异常描述</th>
                    <th>时间</th>
                    </tr>
        </thead>
    );
    table.appendChild(tbody);
    return table.toReact();
}

var OneRow = function(abnormalRow,i){
    var tr = new ReactFauxDOM.createElement('tr');
    tr.setAttribute("key",i );
    tr.appendChild(
        <td>
            {abnormalRow.user}
        </td>      
    );
    tr.appendChild(
        <td>
            {abnormalRow.action}  {abnormalRow.object}  共{abnormalRow.count}次
        </td>
    );
    tr.appendChild(
        <td>
            {abnormalRow.timestamp}
        </td>
    );
    return tr.toReact();
}


