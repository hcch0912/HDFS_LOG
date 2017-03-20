import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'

class HeatMap extends React.Component {
    constructor(props){
        super(props);
        this.data = this.props.heatMapData;
       // this.data = [{"timestamp": "2014-09-25T00:00:00", "value": {"Active Value": 30.22}}, {"timestamp": "2014-09-25T01:00:00", "value": {"Active Value": 41.61}}, {"timestamp": "2014-09-25T02:00:00", "value": {"Active Value": 50.71}}, {"timestamp": "2014-09-25T03:00:00", "value": {"Active Value": 57.34}}, {"timestamp": "2014-09-25T04:00:00", "value": {"Active Value": 79.64}}, {"timestamp": "2014-09-25T05:00:00", "value": {"Active Value": 76.93}}, {"timestamp": "2014-09-25T06:00:00", "value": {"Active Value": 106.45}}, {"timestamp": "2014-09-25T07:00:00", "value": {"Active Value": 79.72}}, {"timestamp": "2014-09-25T08:00:00", "value": {"Active Value": 74.23}}, {"timestamp": "2014-09-25T09:00:00", "value": {"Active Value": 90.48}}, {"timestamp": "2014-09-25T10:00:00", "value": {"Active Value": 94.74}}, {"timestamp": "2014-09-25T11:00:00", "value": {"Active Value": 85.97}}, {"timestamp": "2014-09-25T12:00:00", "value": {"Active Value": 69.23}}, {"timestamp": "2014-09-25T13:00:00", "value": {"Active Value": 82.63}}, {"timestamp": "2014-09-25T14:00:00", "value": {"Active Value": 244.89}}];
    }
    componentDidMount(){
      
    }
    onChange(){
       
    }
    componentDidMount() {
        
        var itemSize = 18,
            cellSize = itemSize-1,
            width = 360,
            height = 360,
            margin = {top:20,right:20,bottom:20,left:25};

        var dayFormat = function(date){
            var date = new Date(date);
            //console.log(date.getDate());
            return date.getDate();
        }
        var hourFormat = function(date){
            var date = new Date(date);
            //console.log(date.getHours());
            return date.getHours();
        }
        var timeFormat = function(date){
            var date = new Date(date);
            return date;
        }
        var monthDayFormat = function(date){
            var date = new Date(date);
            return date.getMonth()+'.'+date.getDay();
        }
        var dateDiff = function(date1,date2){
            var date11 = new Date(date1);
            var date22 = new Date(date2);
            var monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
            var i = date11.getMonth();
            var j = date22.getMonth();
            var diff = 0;
            for(i ; i > 0; i--){
                diff += monthdays[i-1];
            }
            for (j ; j>0 ;j --){
                diff -= monthdays[j-1]
            }
            diff += date11.getDate();
            diff -= date22.getDate();
            return diff;     
        }
        var hourDiff = function(date1,date2){
          return ( (new Date(date1)).getHours()-( new Date(date2)).getHours());
        }
        //data vars for rendering
        var dateExtent = null,
            dayOffset = 0,
            colorCalibration = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'],
            dailyValueExtent = {};

        //axises and scales
        var axisWidth = 0 ,
            axisHeight = itemSize*24,
            xAxisScale = d3.scaleTime(),
            xAxis = d3.axisTop()
            .ticks(d3.timeDay.every(4))
            .tickFormat(d3.timeFormat('%m.%d')),
            yAxisScale = d3.scaleLinear()
            .range([0,axisHeight])
            .domain([0,24]),
            yAxis = d3.axisLeft()
            .ticks(5)
            .tickFormat(d3.format('02d'))
            .scale(yAxisScale);

       
            initCalibration();
       
            var svg = d3.select('[role="heatmap"]');
            var heatmap = svg
                .attr('width',width)
                .attr('height',height)
            .append('g')
                .attr('width',width-margin.left-margin.right)
                .attr('height',height-margin.top-margin.bottom)
                .attr('transform','translate('+margin.left+','+margin.top+')');
            var rect = null;

            //var data= this.props.heatMapData;
            this.data.forEach(function(valueObj){
                valueObj['date'] = d3.timeParse(valueObj['timestamp']);
                var day = valueObj['day'] = monthDayFormat(valueObj['date']);
                var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000,-1]);
                var pmValue = valueObj['value']['Active Value'];
                dayData[0] = d3.min([dayData[0],pmValue]);
                dayData[1] = d3.max([dayData[1],pmValue]);
            });

            dateExtent = d3.extent(this.data,function(d){
                return d.date;
            });
            //if x axis can not be date
            if(dateDiff(dateExtent[1],dateExtent[0])<= 1 ){
              axisWidth =  itemSize * (hourDiff(dateExtent[1],dateExtent[0]) + 1);
            }else{
                  axisWidth = itemSize*(dateDiff(dateExtent[1],dateExtent[0])+1);
            }
        
            //render axises
            //console.log(axisWidth); 414
            xAxis.scale((xAxisScale.range([0,axisWidth]).domain([new Date(dateExtent[0]),new Date(dateExtent[1])])));
            //xAxis.scale(xAxisScale.range([0,axisWidth]).domain([dateExtent[0],dateExtent[1]]));  
            svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')
            .attr('class','x axis')
            .call(xAxis)
            .append('text')
            .text('date')
            .attr('transform','translate('+axisWidth+',-10)');

            svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')
            .attr('class','y axis')
            .call(yAxis)
            .append('text')
            .text('time')
            .attr('transform','translate(-10,'+axisHeight+') rotate(-90)');

            //render heatmap rects
            
            dayOffset = dateExtent[0];
            rect = heatmap.selectAll('rect')
            .data(this.data)
            .enter().append('rect')
            .attr('width',cellSize)
            .attr('height',cellSize)
            .attr('x',function(d){
               // return itemSize*(dayFormat(d.date)-dayOffset);
               return itemSize*(dateDiff(d.date,dayOffset));
            })
            .attr('y',function(d){            
                return hourFormat(d.date)*itemSize;
            })
            .attr('fill','#ffffff');

            rect.filter(function(d){ return d.value['Active Value']>0;})
            .append('title')
            .text(function(d){
                return monthDayFormat(d.date)+' '+d.value['Active Value'];
            });
            if(typeof document!=='undefined'){
                    renderColor();
            }
            
         
            function initCalibration(){
                d3.select('[role="calibration"] [role="example"]').select('svg')
                .selectAll('rect').data(colorCalibration).enter()
                .append('rect')
                .attr('width',cellSize)
                .attr('height',cellSize)
                .attr('x',function(d,i){
                    return i*itemSize;
                })
                .attr('fill',function(d){
                    return d;
            });

        //bind click event
            d3.selectAll('[role="calibration"] [name="displayType"]').on('click',function(){
                renderColor();
                });
            }

            function renderColor(){
                var renderByCount = document.getElementsByName('displayType')[0].checked;
                if(renderByCount !== true){
                    document.getElementsByName('displayType')[0].checked = false;
                    document.getElementsByName('displayType')[1].checked = true;
                }

                rect
                .filter(function(d){
                    return (d.value['Active Value']>=0);
                })
                .transition()
                .delay(function(d){      
                    return (dateDiff(d.date,dayOffset)*15);
                })
                .duration(500)
                .attrTween('fill',function(d,i,a){
                    //choose color dynamicly      
                    var colorIndex = d3.scaleQuantize()
                    .range([0,1,2,3,4,5])
                    .domain((renderByCount?[0,500]:dailyValueExtent[d.day]));

                    return d3.interpolate(a,colorCalibration[colorIndex(d.value['Active Value'])]);
                });
            }
            
            //extend frame height in `http://bl.ocks.org/`
            //d3.select(self.frameElement).style("height", "600px");

    }
    render(){
        var div = new ReactFauxDOM.createElement('div');
        div.appendChild(<div className="days-hours-heatmap">
                        <div className="calibration" role="calibration">
                            <div className="group" role="example">
                            <svg width="120" height="17">
                            </svg>
                            <div role="description" className="description">
                                <label>Less</label>
                                <label>More</label>
                            </div>        
                            </div>
                            <div role="toggleDisplay" className="display-control">
                            <div>
                                <input type="radio" name="displayType" checked />
                                <label>count</label>
                            </div>
                            <div>
                                <input type="radio" name="displayType"/>
                                <label>daily</label> 
                            </div>
                            </div>
                        </div>
                        <svg role="heatmap" className="heatmap"></svg>
            </div>);
        return div.toReact();
        
     }
}
export default HeatMap;