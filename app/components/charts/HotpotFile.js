import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';
//import Canvas from 'canvas'

class HotpotFile extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //  var fontSizeRange = d3.scaleLinear();
        // var cloudGroup = d3.select("#wordcloud").append("svg")
        //     .attr("width", 400)
        //     .attr("height", 400)
        //     .append("g")
        //     .attr("transform", "translate(300,300)");
        
       
        //    var resultArray = [
        //        {"word":"VectorData","weight": 20},
        //        {"word":"DEMData","weight":25 },
        //        {"word":"三四级影像数据","weight":22 },
        //        {"word":"文档数据集元数据","weight":14 },
        //        {"word":"新型影像数据模型","weight":19 },
        //        {"word":"高分1数据","weight":5 }
        //    ]
           
        //     // Dynamically calculate the font sizes
        //     fontSizeRange
        //         .domain(resultArray.map(function(user){
        //             return user.weight;
        //         }))
        //         .range([8, 35]);
            
        //     // And start to layout the cloud
        //     var cloud = new cloud();
        //     cloud
        //         .size([400, 400])
        //         .words(resultArray.map(function(d, i) {
        //             var result = {text: resultArray[i].word, size: resultArray[i].weight};
        //             return result;
        //         }))
        //         .padding(1)
        //         .rotate(function() { return ~~(Math.random() * 70) - 35 ; })
        //         .font("Impact")
        //         .fontSize(function(d) { return fontSizeRange(d.size); })
        //         .on("end", draw)
        //         .start();
            
        //     // This function placed here to increase readability
        //     function draw(words) {
        //         cloudData = cloudGroup
        //             .selectAll("text")
        //             .data(words);
                
        //         // This part should deal with (newly) entering data
        //         cloudData.enter().append("text")
        //             .style("font-size", "0px")
        //             .style("font-family", "Impact")
        //             .attr("text-anchor", "middle")
        //             .attr("transform", function(d) {
        //                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        //             })
        //             .text(function(d) { return d.text; })
        //             .transition().duration(duration).style("font-size", function(d) { return d.size + "px"; });
                
        //         // This with updating existing data
        //         cloudData.transition().duration(duration).style("font-size", function(d) { return d.size + "px"; });
                
        //         // And this with exiting unused data
        //         cloudData.exit()
        //             .transition().duration(duration).style("font-size", "0px")
        //             .remove();
        //     }
    }
    render(){
        var div = new ReactFauxDOM.createElement('div');
         div.appendChild(
            <svg className="wordcloud" id = "wordcloud"></svg>
         );
         return div.toReact();

    }
}
export default HotpotFile;

// var cloud = function() {
//     var size = [256, 256],
//         text = cloudText,
//         font = cloudFont,
//         fontSize = cloudFontSize,
//         rotate = cloudRotate,
//         padding = cloudPadding,
//         spiral = archimedeanSpiral,
//         words = [],
//         timeInterval = Infinity,
//         event = d3.dispatch("word", "end"),
//         timer = null,
//         cloud = {};

//     cloud.start = function() {
//       var board = zeroArray((size[0] >> 5) * size[1]),
//           bounds = null,
//           n = words.length,
//           i = -1,
//           tags = [],
//           data = words.map(function(d, i) {
//         return {
//           text: text.call(this, d, i),
//           font: font.call(this, d, i),
//           rotate: rotate.call(this, d, i),
//           size: ~~fontSize.call(this, d, i),
//           padding: cloudPadding.call(this, d, i)
//         };
//       }).sort(function(a, b) { return b.size - a.size; });

//       if (timer) clearInterval(timer);
//       timer = setInterval(step, 0);
//       step();

//       return cloud;

//       var  step = function () {
//         var start = +new Date,
//             d;
//         while (+new Date - start < timeInterval && ++i < n && timer) {
//           d = data[i];
//           d.x = (size[0] * (Math.random() + .5)) >> 1;
//           d.y = (size[1] * (Math.random() + .5)) >> 1;
//           cloudSprite(d, data, i);
//           if (place(board, d, bounds)) {
//             tags.push(d);
//             event.word(d);
//             if (bounds) cloudBounds(bounds, d);
//             else bounds = [{x: d.x + d.x0, y: d.y + d.y0}, {x: d.x + d.x1, y: d.y + d.y1}];
//             // Temporary hack
//             d.x -= size[0] >> 1;
//             d.y -= size[1] >> 1;
//           }
//         }
//         if (i >= n) {
//           cloud.stop();
//           event.end(tags, bounds);
//         }
//       }
//     }

//     cloud.stop = function() {
//       if (timer) {
//         clearInterval(timer);
//         timer = null;
//       }
//       return cloud;
//     };

//     cloud.timeInterval = function(x) {
//       if (!arguments.length) return timeInterval;
//       timeInterval = x == null ? Infinity : x;
//       return cloud;
//     };

//     function place(board, tag, bounds) {
//       var perimeter = [{x: 0, y: 0}, {x: size[0], y: size[1]}],
//           startX = tag.x,
//           startY = tag.y,
//           maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
//           s = spiral(size),
//           dt = Math.random() < .5 ? 1 : -1,
//           t = -dt,
//           dxdy,
//           dx,
//           dy;

//       while (dxdy = s(t += dt)) {
//         dx = ~~dxdy[0];
//         dy = ~~dxdy[1];

//         if (Math.min(dx, dy) > maxDelta) break;

//         tag.x = startX + dx;
//         tag.y = startY + dy;

//         if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
//             tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
//         // TODO only check for collisions within current bounds.
//         if (!bounds || !cloudCollide(tag, board, size[0])) {
//           if (!bounds || collideRects(tag, bounds)) {
//             var sprite = tag.sprite,
//                 w = tag.width >> 5,
//                 sw = size[0] >> 5,
//                 lx = tag.x - (w << 4),
//                 sx = lx & 0x7f,
//                 msx = 32 - sx,
//                 h = tag.y1 - tag.y0,
//                 x = (tag.y + tag.y0) * sw + (lx >> 5),
//                 last;
//             for (var j = 0; j < h; j++) {
//               last = 0;
//               for (var i = 0; i <= w; i++) {
//                 board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
//               }
//               x += sw;
//             }
//             delete tag.sprite;
//             return true;
//           }
//         }
//       }
//       return false;
//     }

//     cloud.words = function(x) {
//       if (!arguments.length) return words;
//       words = x;
//       return cloud;
//     };

//     cloud.size = function(x) {
//       if (!arguments.length) return size;
//       size = [+x[0], +x[1]];
//       return cloud;
//     };

//     cloud.font = function(x) {
//       if (!arguments.length) return font;
//       font = d3.functor(x);
//       return cloud;
//     };

//     cloud.rotate = function(x) {
//       if (!arguments.length) return rotate;
//       rotate = d3.functor(x);
//       return cloud;
//     };

//     cloud.text = function(x) {
//       if (!arguments.length) return text;
//       text = d3.functor(x);
//       return cloud;
//     };

//     cloud.spiral = function(x) {
//       if (!arguments.length) return spiral;
//       spiral = spirals[x + ""] || x;
//       return cloud;
//     };

//     cloud.fontSize = function(x) {
//       if (!arguments.length) return fontSize;
//       fontSize = d3.functor(x);
//       return cloud;
//     };

//     cloud.padding = function(x) {
//       if (!arguments.length) return padding;
//       padding = d3.functor(x);
//       return cloud;
//     };

//     return d3.rebind(cloud, event, "on");
//   }

//   var  cloudText = function(d) {
//     return d.text;
//   }

//   var  cloudFont = function () {
//     return "serif";
//   }

//   var cloudFontSize = function (d) {
//     return Math.sqrt(d.value);
//   }

//   var cloudRotate = function() {
//     return (~~(Math.random() * 6) - 3) * 30;
//   }

//   var cloudPadding = function () {
//     return 1;
//   }

//   // Fetches a monochrome sprite bitmap for the specified text.
//   // Load in batches for speed.
//   var cloudSprite = function(d, data, di) {
//     if (d.sprite) return;
//     c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
//     var x = 0,
//         y = 0,
//         maxh = 0,
//         n = data.length;
//     di--;
//     while (++di < n) {
//       d = data[di];
//       c.save();
//       c.font = ~~((d.size + 1) / ratio) + "px " + d.font;
//       var w = c.measureText(d.text + "m").width * ratio,
//           h = d.size << 1;
//       if (d.rotate) {
//         var sr = Math.sin(d.rotate * cloudRadians),
//             cr = Math.cos(d.rotate * cloudRadians),
//             wcr = w * cr,
//             wsr = w * sr,
//             hcr = h * cr,
//             hsr = h * sr;
//         w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
//         h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
//       } else {
//         w = (w + 0x1f) >> 5 << 5;
//       }
//       if (h > maxh) maxh = h;
//       if (x + w >= (cw << 5)) {
//         x = 0;
//         y += maxh;
//         maxh = 0;
//       }
//       if (y + h >= ch) break;
//       c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
//       if (d.rotate) c.rotate(d.rotate * cloudRadians);
//       c.fillText(d.text, 0, 0);
//       c.restore();
//       d.width = w;
//       d.height = h;
//       d.xoff = x;
//       d.yoff = y;
//       d.x1 = w >> 1;
//       d.y1 = h >> 1;
//       d.x0 = -d.x1;
//       d.y0 = -d.y1;
//       x += w;
//     }
//     var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
//         sprite = [];
//     while (--di >= 0) {
//       d = data[di];
//       var w = d.width,
//           w32 = w >> 5,
//           h = d.y1 - d.y0,
//           p = d.padding;
//       // Zero the buffer
//       for (var i = 0; i < h * w32; i++) sprite[i] = 0;
//       x = d.xoff;
//       if (x == null) return;
//       y = d.yoff;
//       var seen = 0,
//           seenRow = -1;
//       for (var j = 0; j < h; j++) {
//         for (var i = 0; i < w; i++) {
//           var k = w32 * j + (i >> 5),
//               m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
//           if (p) {
//             if (j) sprite[k - w32] |= m;
//             if (j < w - 1) sprite[k + w32] |= m;
//             m |= (m << 1) | (m >> 1);
//           }
//           sprite[k] |= m;
//           seen |= m;
//         }
//         if (seen) seenRow = j;
//         else {
//           d.y0++;
//           h--;
//           j--;
//           y++;
//         }
//       }
//       d.y1 = d.y0 + seenRow;
//       d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
//     }
//   }

//   // Use mask-based collision detection.
//   var cloudCollide = function(tag, board, sw) {
//     sw >>= 5;
//     var sprite = tag.sprite,
//         w = tag.width >> 5,
//         lx = tag.x - (w << 4),
//         sx = lx & 0x7f,
//         msx = 32 - sx,
//         h = tag.y1 - tag.y0,
//         x = (tag.y + tag.y0) * sw + (lx >> 5),
//         last;
//     for (var j = 0; j < h; j++) {
//       last = 0;
//       for (var i = 0; i <= w; i++) {
//         if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
//             & board[x + i]) return true;
//       }
//       x += sw;
//     }
//     return false;
//   }

//   var cloudBounds = function(bounds, d) {
//     var b0 = bounds[0],
//         b1 = bounds[1];
//     if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
//     if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
//     if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
//     if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
//   }

//   var collideRects = function(a, b) {
//     return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
//   }

//   var archimedeanSpiral = function(size) {
//     var e = size[0] / size[1];
//     return function(t) {
//       return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
//     };
//   }

//   var rectangularSpiral = function(size) {
//     var dy = 4,
//         dx = dy * size[0] / size[1],
//         x = 0,
//         y = 0;
//     return function(t) {
//       var sign = t < 0 ? -1 : 1;
//       // See triangular numbers: T_n = n * (n + 1) / 2.
//       switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
//         case 0:  x += dx; break;
//         case 1:  y += dy; break;
//         case 2:  x -= dx; break;
//         default: y -= dy; break;
//       }
//       return [x, y];
//     };
//   }

//   // TODO reuse arrays?
//   var zeroArray = function(n) {
//     var a = [],
//         i = -1;
//     while (++i < n) a[i] = 0;
//     return a;
//   };

//   var cloudRadians = Math.PI / 180,
//       cw = 1 << 11 >> 5,
//       ch = 1 << 11,
//       canvas,
//       ratio = 1;

//   if (typeof document !== "undefined") {
//     canvas = document.createElement("canvas");
//     canvas.width = 1;
//     canvas.height = 1;
//     ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
//     canvas.width = (cw << 5) / ratio;
//     canvas.height = ch / ratio;
//   } else {
//     // node-canvas support
//     var Canvas = require("canvas");
//     canvas = new Canvas(cw << 5, ch);
//   }

//   var c = canvas.getContext("2d"),
//       spirals = {
//         archimedean: archimedeanSpiral,
//         rectangular: rectangularSpiral
//       };
//   c.fillStyle = "red";
//   c.textAlign = "center";
