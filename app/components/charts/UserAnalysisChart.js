import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom'


class UserAnalysisChart extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
         var svg = d3.select(".user_ana"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(20,0)");       // move right 20px.

 
        var xScale =  d3.scaleLinear()
                .domain([0,50])
                .range([0, 200]);

        // Setting up a way to handle the data
        var tree = d3.cluster()                 // This D3 API method setup the Dendrogram datum position.
                .size([height, width - 300])    // Total width - bar chart width = Dendrogram chart width
                .separation(function separate(a, b) {
                    return a.parent == b.parent            // 2 levels tree grouping for category
                    || a.parent.parent == b.parent
                    || a.parent == b.parent.parent ? 0.4 : 0.8;
                });

        var stratify = d3.stratify()            // This D3 API method gives cvs file flat data array dimensions.
                .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });


            var data = this.props.userAnaData;
            var root = stratify(data);
            tree(root);

            // Draw every datum a line connecting to its parent.
            var link = g.selectAll(".link")
                    .data(root.descendants().slice(1))
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        return "M" + d.y + "," + d.x
                                + "C" + (d.parent.y + 30) + "," + d.x
                                + " " + (d.parent.y + 30) + "," + d.parent.x
                                + " " + d.parent.y + "," + d.parent.x;
                    });

            // Setup position for every datum; Applying different css classes to parents and leafs.
            var node = g.selectAll(".node")
                    .data(root.descendants())
                    .enter().append("g")
                    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            // Draw every datum a small circle.
            node.append("circle")
                    .attr("r", 4);

            // Setup G for every leaf datum.
            var leafNodeG = g.selectAll(".node--leaf")
                    .append("g")
                    .attr("class", "node--leaf-g")
                    .attr("transform", "translate(" + 8 + "," + -13 + ")");

            leafNodeG.append("rect")
                    .attr("class","shadow")
                    .style("fill", function (d) {return d.data.color;})
                    .attr("width", 2)
                    .attr("height", 20)
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .transition()
                        .duration(200)
                        .attr("width", function (d) {return xScale(d.data.value);});

            leafNodeG.append("text")
                    .attr("dy", 10.5)
                    .attr("x", 4)
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
                    });

            // Write down text for every parent datum
            var internalNode = g.selectAll(".node--internal");
            internalNode.append("text")
                    .attr("y", -10)
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
                    });

            // Attach axis on top of the first leaf datum.
            var firstEndNode = g.select(".node--leaf");
                firstEndNode.insert("g")
                        .attr("class","xAxis")
                        .attr("transform", "translate(" + 3 + "," + -7 + ")");


            // The moving ball
            var ballG = svg.insert("g")
                    .attr("class","ballG")
                    .attr("transform", "translate(" + 600 + "," + height/2 + ")");
            ballG.insert("circle")
                    .attr("class","shadow")
                    .style("fill","steelblue")
                    .attr("r", 5);
            ballG.insert("text")
                    .style("text-anchor", "middle")
                    .attr("dy",5)
                    .text("0");

            // Animation functions for mouse on and off events.
            d3.selectAll(".node--leaf-g")
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseOut);

            function handleMouseOver(d) {
                var leafG = d3.select(this);

                leafG.select("rect")
                        .attr("stroke","#4D4D4D")
                        .attr("stroke-width","2");


                var ballGMovement = ballG.transition()
                        .duration(200)
                        .attr("transform", "translate(" + (d.y
                                + xScale(d.data.value) + 60) + ","
                                + (d.x ) + ")");

                ballGMovement.select("circle")
                        .style("fill", d.data.color)
                        .attr("r", 18);

                ballGMovement.select("text")
                        .delay(150)
                        .style("font-size","10px")
                        .text(Number(d.data.value).toFixed(1)+"%");
            }
            function handleMouseOut() {
                var leafG = d3.select(this);

                leafG.select("rect")
                        .attr("stroke-width","0");
            }

       

        function row(d) {
            return {
                id: d.id,
                value: +d.value,
                color: d.color
            };
        }
    }
    render(){
         var div = new ReactFauxDOM.createElement('div');
         div.style.height = "350px";
         div.appendChild(
           <svg className="user_ana" width="500" height="300"> </svg>
         );
         div.appendChild(
            <div  className= "userTime ">
                <a className = "ui top left attached label" > 通常操作时间段 </a>
                <div  id ="timeshow" >
                    <div className="ui mini statistics">
                        <div className="orange statistic">
                            <div className="value">
                            10:00 - 15:00
                            </div>
                            <div className="label">
                            root
                            </div>
                        </div>
                        <div className="green statistic">
                            <div className="value">
                            13:00 - 18:00
                            </div>
                            <div className="label">
                            hui
                            </div>
                        </div>
                        <div className="blue statistic">
                            <div className="value">
                            17:00 - 18:00
                            </div>
                            <div className="label">
                            chen
                            </div>
                        </div>

                    </div>
                </div>
             </div>
         )
         return div.toReact();
    }
}

export default UserAnalysisChart;