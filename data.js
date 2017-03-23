
var Promise = require('promise');

var dataCol = 'hdfs_log';
//Time Peroid 
var oneH = 1000 * 60 * 60;
var timePeroidArr = [oneH, oneH * 6, oneH * 12, oneH * 24, oneH * 24 * 2, oneH * 24 * 7, oneH * 24 * 30,oneH * 24 * 360];
var TSU = 6;
var currentTime = new Date('2017-03-20 23:48:24');
//Bubble Chart 
var BubbleData = function(new_actionArr,upload_actionArr,update_actionArr,login,del,delD,delAll,checkPass){
            return (
            {
                    "name": "resultArr",
                    "children": [
                        {
                        "name": "新建",
                        "children": new_actionArr
                        },
                        {
                        "name": "上传 ",
                        "children": upload_actionArr
                         },
                         {
                        "name": "修改",
                        "children": update_actionArr
                         },
                        {"name": "登录", "size": login},
                        {"name": "删除集合", "size": del},
                        {"name":"删除数据", "size": delD},
                        {"name":"删除所有数据", "size": delAll},
                        {"name":"审计通过","size":checkPass}
                    ]
            });
    };
var   new_actionArr = function(char,user,meta,dataM,dataB,coll){
            return(     [   
                        {"name": "新建角色", "size": char},
                        {"name": "新建用户", "size": user},
                        {"name": "新建元数据模板", "size": meta},
                        {"name": "新建数据模型", "size": dataM},
                        {"name": "新建数据库", "size": dataB},
                        {"name": "新建集合", "size": coll}
                        ]
            );
    };
var    upload_actionArr = function(ImageD,TFData,DemD,VecD,FD,MD){
            return(      [
                        {"name": "上传ImageData", "size": ImageD},
                        {"name": "上传三四级影像数据", "size": TFData},
                        {"name": "上传DEMData", "size": DemD},
                        {"name": "上传VectorData", "size": VecD},
                        {"name": "上传FileData", "size": FD},
                        {"name": "上传ModelData", "size": MD}
                        ]
            );
    };
 var update_actionArr = function(userP, cate){
     return([
         {"name": "用户角色", "size": userP},
          {"name": "目录", "size": cate },
     ]);
 }   
//Line Chart   divided by 6 
 var LineData = function(currentTime,timeSpan,users) {
    var data = [];
       for(var i = TSU -1 ; i >= 0; i-- ){
           data.push({"date": new Date( currentTime - timeSpan * i )});
       } 

      for(var i = 0 ; i< data.length ; i++){
          for(var j =0; j< users.length ; j++){
           
              data[i][users[j]] = 0 ;
          }
      }
      return data;
 }

 var BarData = function(labels, users, users_values) {
     var series = [];
     for(var i = 0; i<users.length ; i++){
        series.push(
            {
                'label' : users[i],
                'values': users_values[i]
            }
        );
     }
     return({
        'labels': labels,
        'series': series
     })
    };


//{"timestamp": "2014-09-25T00:00:00", "value": {"PM2.5": 30.22}}
var HeatData = function(dataArr){
   return ( {
        "data": dataArr
        });
}

module.exports ={

    getHeat: function(db,filters, response){
            var timeSpan = timePeroidArr[filters.time]/ TSU;
            var timeSpan2 = timeSpan / TSU;

    
            var data = new HeatData([]);

            var queryStrHeat = {
                "timestamp" :{ $gte: new Date(currentTime- timePeroidArr[filters.time]).toISOString()},
            }
            this.queryU(db, queryStrHeat, function(err, res){

                 for(var j = 0; j< filters.users.length; j++){
                            for(var i = 0; i<res.length; i++){
                            var thisTime = new Date(res[i].timestamp)
                                for( var k = 0 ; k < TSU ; k ++){
                                    if(currentTime - thisTime < timeSpan * (k+1) && currentTime - thisTime > timeSpan * k){
                                        if(res[i].user == filters.users[j] ){
                                             data[TSU-k-1][filters.users[i]] += 1; 
                                        }     
                                    }
                                }
                            }
                    }
                for(var i = 0; i< res.length ; i++){
                    data.data.push(
                        {
                            "timestamp": res[i].timestamp,
                            "value": {
                                "count": 0
                            }
                        }
                    );
                }
            })
            
    },

    getBar :function(db, filters, response){

            var data = new BarData([],filters.users,[]);
            var user_values = [ ];
            for (var i = 0; i< filters.users.length ; i++){
                user_values.push({'label':filters.users[i],'values':[]});
            }
            // labels.length = user_values.values.length
            var labels = ["登录"];
            var queryStrBar  = {
                "timestamp" :{ $gte: new Date(currentTime - timePeroidArr[filters.time]).toISOString()},
            }
            this.queryU(db, queryStrBar, function(err,res){
                if (err)  console.log(err);
                for(var j = 0; j< filters.users.length ; j++){
                    for(var i = 0; i<res.length ; i++){
                        
                        if (res[i].user == filters.users[j] ){
                            if(! labels.includes( res[i].action) ){
                                labels.push(res[i].action);
                                user_values[j].values.push(1);
                            }else {
                                for(var k = 0; k < labels.length ; k ++){
                                    if(res[i].action == labels[k]){
                                        while(user_values[j].values.length <= k){
                                            user_values[j].values.push(0);
                                        }
                                        user_values[j].values[k] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                data.series = user_values;
                data.labels = labels;
                return response.send(data);
            })
    },

    //y - axis  active level -- the action number with one time peroid  
    getLine :function (db,filters, response){
            var timeSpan = timePeroidArr[filters.time]/TSU;
            var data = new LineData(currentTime, timeSpan, filters.users);
    
            var queryStrLine = {
                "timestamp":{ $gte: new Date(currentTime- timePeroidArr[filters.time]).toISOString()}
            }   
          
                this.queryU(db,queryStrLine,function(err,res){
                    if(err){ console.log(err)}
                    for(var j = 0; j< filters.users.length; j++){
                            for(var i = 0; i<res.length; i++){
                            var thisTime = new Date(res[i].timestamp)
                                for( var k = 0 ; k < TSU ; k ++){
                              
                                    if(currentTime - thisTime < timeSpan * (k+1) && currentTime - thisTime > timeSpan * k){
                                        if(res[i].user == filters.users[j] ){
                                           
                                             data[TSU-k-1][filters.users[j]] += 1; 
                                        }     
                                    }
                                }
                            }
                    }
                   return response.send(data);
                });
    },
    getLogsByUser : function(db,user, cb) {
                db.collection(dataCol).find({'user': user}).toArray(cb);
        }
    ,
    queryU : function (db,query,cb){
                db.collection(dataCol).find(query).toArray(cb);
    },
    
    getBubble : function(db,filters,response) {
          
             var bubbleData = { 
                'name':'bubble',
                'children':[]
            }
            for(var i = 0; i< filters.users.length; i++){
                bubbleData.children.push({
                    'name': filters.users[i],
                    'children':[]
                });
            }
            var myNew_actionArr = new new_actionArr(0,0,0,0,0,0);
            var myUpload_actionArr = new upload_actionArr(0,0,0,0,0,0);
            var myUpdate_actionArr = new update_actionArr(0,0);
            var checkPass = 0, login = 0, del = 0, delD = 0, delAll = 0;
            var queryStrBubble = {
                "timestamp":{ $gte: new Date(currentTime- timePeroidArr[filters.time]).toISOString()}
            }   

            this.queryU(db,queryStrBubble,function(err,res){

                for(var j =0; j< filters.users.length ; j++){
                    for(var i = 0; i< res.length; i++){
                        if(res[i].action == '新建'){
                                if(res[i].object == '角色'){
                                    myNew_actionArr[0].size +=1;
                                }else if(res[i].object == '用户'){
                                    myNew_actionArr[1].size +=1;
                                }else if(res[i].object == '元数据模板'){
                                    myNew_actionArr[2].size +=1;
                                }else if(res[i].object == '数据模型'){
                                myNew_actionArr[3].size+=1;
                                }else if(res[i].object == '数据库'){
                                    myNew_actionArr[4].size+=1;
                                }else if(res[i].object == '集合'){
                                    myNew_actionArr[5].size +=1;
                                }
                        }
                        else if (res[i].action == '上传'){
                                if(res[i].object == 'ImageData角色'){
                                    myUpload_actionArr[0].size +=1;
                                }else if(res[i].object == '三四级影像数据'){
                                    myUpload_actionArr[1].size +=1;
                                }else if(res[i].object == 'DEMData'){
                                    myUpload_actionArr[2].size +=1;
                                }else if(res[i].object == 'VectorData'){
                                    myUpload_actionArr[3].size +=1;
                                }else if(res[i].object == 'FileData'){
                                    myUpload_actionArr[4].size +=1;
                                }else if(res[i].object == 'ModelData'){
                                    myUpload_actionArr[5].size +=1;
                                }
                        }else if (res[i].action == '登录'){
                            login +=1;
                        }else if(res[i].action == '删除'){
                            del+=1;
                        }else if(res[i].action == '删除数据'){
                            delD+=1;
                        }else if (res[i].action == '删除所有数据'){
                            delAll +=1;
                        }else if (res[i].action =='审计通过'){
                            checkPass +=1;
                        }else if(res[i].action == '修改'){
                            if(res[i].object =='用户信息'){
                                myUpdate_actionArr[0].size +=1;
                            }
                            if(res[i].object =='目录'){
                                myUpdate_actionArr[1].size +=1;
                            }
                        }  
                    }
                        var resultArr = BubbleData(myNew_actionArr,myUpload_actionArr,myUpdate_actionArr, login,del,delD,delAll,checkPass);
                        resultArr.children[1].children = myUpload_actionArr;
                        resultArr.children[2].children = myUpdate_actionArr;
                        resultArr.children[3].size = login;
                        resultArr.children[4].size = del;
                        resultArr.children[5].size = delD;
                        resultArr.children[6].size = delAll;
                        bubbleData.children[j] = resultArr;
                }
            
        
             return response.send( bubbleData);
          });
    },
 
                //  for(var j = 0; j< bubbleData.children.length ; j++){
                //     for(var i = 0; i<res.length ; i++){
                //         if (res[i].user == bubbleData.children[j].name ){
                //             var index = searchInnJson(bubbleData.children[j], res[i].action);
  
                //             if(index!=false){
                //                 console.log(res[i].action);
                //                 var index2= searchInnJson(bubbleData.children[j].children[index], res[i].object);
                //                // console.log(res[i].object);
                //                 if(index2 != false){
                //                     console.log(res[i].object);
                //                     console.log(index2);
                //                     bubbleData.children[j].children[index].children[index2].size += 1;
                //                 }else{
                //                      bubbleData.children[j].children[index].children.push({'name':res[i].action+res[i].object+"",'size':1});
                //                 }
                //             }else{
                //                  bubbleData.children[j].children.push({'name':res[i].action+"",'children':[]});
                //             }
                //         }
                //     }
                 //}

          

            //       var searchInnJson = function(json, value){
                

            //     //console.log(json.children);
            //     if(json.children.length == 0)  return false;
             
            //     for(var i =0 ; i< json.children.length; i++){
            //        // console.log(json.children[i].name );
            //        //console.log("ziji"+json.children[i].name.indexOf(value) != -1);
            //        console.log(" this is number x" + i);
            //         if( json.children[i].name == value ) {
            //             return i;
            //         }else if ( json.children[i].name.indexOf(value) != -1 ){
            //             return i;
            //         }
            //     }
            //     return false;
            // }


}
