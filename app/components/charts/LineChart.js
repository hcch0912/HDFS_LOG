import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'

class LineChart  extends React.Component {
    constructor(props){
        super(props);
        this.data = this.props.lineChartData;
    }
    componentDidMount(){
        var svg = d3.select(".linechart"),
            margin = {top: 20, right: 40, bottom: 20, left: 20},
            width = 420,
            height = 350,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var parseTime = d3.timeParse("%Y%m%d");

        var x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.count); });

        var data = this.props.lineChartData;
        console.log(data);
        //var users
        data.columns = ['date', 'root','hui','chen'];
        if(data.length != 0){
            var users = data.columns.slice(1).map(function(id) {
                return {
                id: id,
                values: data.map(function(d) {
                    return {date: new Date(d.date), count: d[id]};
                })
                };
            });
           x.domain(d3.extent(data, function(d) { 
               var newDate = new Date(d.date);
               return newDate; }));

            y.domain([
                d3.min(users, function(c) { return d3.min(c.values, function(d) { return d.count; }); }),
                d3.max(users, function(c) { return d3.max(c.values, function(d) { return d.count; }); })
            ]);

            z.domain(users.map(function(c) { return c.id; }));

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("count, #");

            var city = g.selectAll(".city")
                .data(users)
                .enter().append("g")
                .attr("class", "city")
                .style("fill", "none");

            city.append("path")
                .attr("class", "line")
                .attr("d", function(d) { return line(d.values); })
                .style("stroke", function(d) { return z(d.id); })
                .style("fill", "none");
         

            city.append("text")
                .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.count) + ")"; })
                .attr("x", 3)
                .attr("dy", "0.35em")
                .style("font", "10px sans-serif")
                .text(function(d) { return d.id; })
                .style("fill","black");
            
        }
        var type =  function(d, _, columns) {
        d.date = parseTime(d.date);
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
        return d;
        }
    }
    render(){
         var div = new ReactFauxDOM.createElement('div');
         div.appendChild(
            <svg className="linechart" id = "linechart"></svg>
         );
         return div.toReact();
    }
}
export default LineChart;