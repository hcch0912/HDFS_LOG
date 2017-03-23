import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'

class BubbleChart extends React.Component{
    constructor(props){
        super(props);
        this.data = this.props.bubbleChartData;
    }
    componentDidMount(){
       var diameter = 400,
            format = d3.format(",d"),
            color = d3.scaleOrdinal(d3.schemeCategory20c);

        var bubble = d3.pack()
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(".bubblechart").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

      
        var datas  = this.data;
       for(var i = 0; i < datas.children.length; i++){
        if(datas && datas.children.length != 0){
            var root = d3.hierarchy(classes(datas.children[i]))
                .sum(function(d) { return d.value; })
                .sort(function(a, b) { return b.value - a.value; });

            bubble(root);
            var node = svg.selectAll(".node")
                .data(root.children)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + (d.x+200*i )+ "," + d.y + ")"; });

            node.append("title")
                .text(function(d) { return d.data.className + ": " + format(d.value); });

            node.append("circle")
                .attr("r", function(d) { return d.r; })
                .style("fill", function(d) { 
                    return color(d.data.packageName); 
                });

            node.append("text")
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .style("font-size","10px")
                .style("fill","white")
                .text(function(d) { return d.data.className.substring(0, d.r / 3); });
        // });

            // Returns a flattened hierarchy containing all leaf nodes under the root.
            function classes(root) {
            var classes = [];

            function recurse(name, node) {
                if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
                else classes.push({packageName: name, className: node.name, value: node.size});
            }

            recurse(null, root);
            return {children: classes};
            }

            d3.select(self.frameElement).style("height", diameter + "px");
        }
       }

    }
    render(){
         var div = new ReactFauxDOM.createElement('div');
         div.appendChild(
           <div className="bubblechart"/>
         );
         return div.toReact();
    }
}
export default BubbleChart;