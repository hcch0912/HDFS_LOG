
var Promise = require('promise');

//Time Peroid 
var oneH = 1000 * 60 * 60;
var timePeroidArr = [oneH, oneH * 6, oneH * 12, oneH * 24, oneH * 24 * 2, oneH * 24 * 7, oneH * 24 * 30,oneH * 24 * 360];
var TSU = 6;
var currentTime = new Date('2017-03-01 23:48:24');
//Bubble Chart 
var BubbleData = function(new_actionArr,upload_actionArr,login,del,delD,delAll){
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
                        {"name": "登录", "size": login},
                        {"name": "删除集合", "size": del},
                        {"name":"删除数据", "size": delD},
                        {"name":"删除所有数据", "size": delAll}
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

 var BarData = function(users, users_values) {
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
        'labels': [
            '登录',
            '新建角色', '新建用户','新建元数据模板','新建数据模型','新建数据库','新建集合',
            '上传ImageData','上传三四级影像数据' ,'上传DEMData','上传VectorData','上传FileData','上传ModelData',
            '删除集合','删除数据', '删除所有数据', 
        ],
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
                "timeSpan" :{ $gte: new Date(currentTime- timePeroidArr[filters.time]).toISOString()},
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

            var data = new BarData(filters.users,[]);
            var user_values = [ ];
            for (var i = 0; i< filters.users.length ; i++){
                user_values.push({'label':filters.users[i],'values':[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]});
            }

            var queryStrBar  = {
                "timestamp" :{ $gte: new Date(currentTime - timePeroidArr[filters.time]).toISOString()},
            }
            this.queryU(db, queryStrBar, function(err,res){
                if (err)  console.log(err);
                for(var j = 0; j< filters.users.length ; j++){
                    for(var i = 0; i<res.length ; i++){
                
                        if (res[i].user == filters.users[j] ){
                                if(res[i].action == '新建'){
                                        if(res[i].object == '角色'){
                                            user_values[j].values[1] +=1;
                                        }else if(res[i].object == '用户'){
                                            user_values[j].values[2] +=1;
                                        }else if(res[i].object == '元数据模板'){
                                           user_values[j].values[3] +=1;
                                        }else if(res[i].object == '数据模型'){
                                            user_values[j].values[4] +=1;
                                        }else if(res[i].object == '数据库'){
                                           user_values[j].values[5]+=1;
                                        }else if(res[i].object == '集合'){
                                            user_values[j].values[6] +=1;
                                        }
                                } else if (res[i].action == '上传'){
                                        if(res[i].object == 'ImageData角色'){
                                            user_values[j].values[7] +=1;
                                        }else if(res[i].object == '三四级影像数据'){
                                            user_values[j].values[8] +=1;
                                        }else if(res[i].object == 'DEMData'){
                                            user_values[j].values[9] +=1;
                                        }else if(res[i].object == 'VectorData'){
                                            user_values[j].values[10] +=1;
                                        }else if(res[i].object == 'FileData'){
                                            user_values[j].values[11] +=1;
                                        }else if(res[i].object == 'ModelData'){
                                            user_values[j].values[12] +=1;
                                        }
                                }else if (res[i].action == '登录'){
                                    user_values[j].values[0] +=1;
                                }else if(res[i].action == '删除'){
                                    user_values[j].values[13]+=1;
                                }else if(res[i].action == '删除数据'){
                                    user_values[j].values[14]+=1;
                                }else if (res[i].action == '删除所有数据'){
                                    user_values[j].values[15] +=1;
                                }
                        }
                    }
                }
                data.series = user_values;
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
                                             data[TSU-k-1][filters.users[i]] += 1; 
                                        }     
                                    }
                                }
                            }
                    }
                   return response.send(data);
                });
    },
    getLogsByUser : function(db,user, cb) {
            db.collection('log').find({'user': user}).toArray(cb);
        }
    ,
    queryU : function (db,query,cb){
                db.collection('log').find(query).toArray(cb);
    },
    
    getBubble : function(db,filters,response) {
            
            var myNew_actionArr = new_actionArr(0,0,0,0,0,0);
            var myUpload_actionArr = upload_actionArr(0,0,0,0,0,0);
            var login =0, del =0, delD = 0, delAll = 0;
            var query = {};
            
            this.queryU(db,query,function(err,res){
                //console.log(res);
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
                    }
                }
            
            var resultArr = BubbleData(myNew_actionArr,myUpload_actionArr,login,del,delD,delAll);
            resultArr.children[1].children = myUpload_actionArr;
            resultArr.children[2].size = login;
            resultArr.children[3].size = del;
            resultArr.children[4].size = delD;
            resultArr.children[5].size = delAll;

            return response.send( resultArr);
          });
    },
 


}


            // var queryStrs = [
            //     {'object':'角色','action':'新建'},
            //     {'object':'用户','action':'新建'},
            //     {'object':'元数据模板','action':'新建'},
            //     {'object':'数据模型','action':'新建'},
            //     {'object':'数据库','action':'新建'},
            //     {'object':'集合','action':'新建'},
            //     {'object':'ImageData','action':'上传'},
            //     {'object':'三四级影像数据','action':'上传'},
            //     {'object':'DEMData','action':'上传'},
            //     {'object':'VectorData','action':'上传'},
            //     {'object':'FileData','action':'上传'},
            //     {'object':'ModelData','action':'上传'},
            //     {'action':'登录'},
            //     {'action':'删除'},
            //     {'action':'删除数据'},
            //     {'action':'删除所有数据'}
            // ]