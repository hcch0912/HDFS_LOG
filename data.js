
var Promise = require('promise');

//Time Peroid 
var oneH = 1000 * 60 * 60;
var timePeroidArr = [oneH, oneH * 6, oneH * 12, oneH * 24, oneH * 24 * 2, oneH * 24 * 7, oneH * 24 * 30,oneH * 24 * 360];


//Bubble Chart 
var bubbleData = function(new_actionArr,upload_actionArr,login,del,delD,delAll){
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
                        {"name": "删除", "size": del},
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
 var lineData = function(currentTime,timeSpan) {
     return([
      {"date": new Date (currentTime - timeSpan * 5),"root":0},
      {"date": new Date(currentTime - timeSpan * 4),"root":0},
      {"date": new Date (currentTime - timeSpan * 3),"root":0},
      {"date": new Date (currentTime - timeSpan * 2),"root":0},
      {"date": new Date (currentTime - timeSpan) ,"root":0},
      {"date":currentTime ,"root":0},
      ]);
 }


// var queryStrU = {
//                 'timestamp':{ $gte: new Date(new Date('2017-03-01 23:48:24') - timePeroidArr[0])},
//                 'user': user
//                 }


module.exports ={
    //y - axis  active level -- the action number with one time peroid  
    getLine :function (db,filters, response){
            var timeSpan = timePeroidArr[filters.time]/6;
            var currentTime = new Date('2017-03-01 23:48:24');
            // console.log(currentTime);
            // console.log(timeSpan);
            var data = new lineData(currentTime, timeSpan);
            console.log(new Date(currentTime- timePeroidArr[filters.time]));
            var queryStr1 = {
                "timestamp":{ $gte: new Date(currentTime- timePeroidArr[filters.time]).toISOString()}
            }   
            console.log(queryStr1);        
                this.queryU(db,queryStr1,function(err,res){
                    if(err){ console.log(err)}
                   for(var i = 0; i<res.length; i++){
                       var thisTime = new Date(res[i].timestamp)
                       console.log(res[i].timestamp);
                       if(  currentTime - thisTime < timeSpan){
                            if(res[i].user == 'root') data[5].root += 1;
                       }else if ( currentTime - thisTime > timeSpan && currentTime - thisTime< timeSpan *2  ){
                            if(res[i].user == 'root') data[4].root += 1;
                       }else if ( currentTime - thisTime > 2 * timeSpan && currentTime - thisTime< timeSpan * 3  ){
                            if(res[i].user == 'root') data[3].root += 1;
                       }else if (  currentTime - thisTime> 3 * timeSpan && currentTime - thisTime< timeSpan * 4  ){
                            if(res[i].user == 'root') data[2].root += 1;
                       }
                       else if (  currentTime - thisTime> 4 * timeSpan && currentTime - thisTime< timeSpan * 5  ){
                            if(res[i].user == 'root') data[1].root += 1;
                       }
                       else if (  currentTime - thisTime> 5 * timeSpan && currentTime - thisTime< timeSpan * 6  ){
                            if(res[i].user == 'root') data[0].root += 1;
                       }
                   }
                   console.log(data);
                   return response.send(data);
                });
    },
    getLogsByUser : function(db,user, cb) {
            db.collection('log').find({'user': user}).toArray(cb);
        }
    ,
    // queryP : function(db,query){
    //     return new Promise(function (fulfill, reject){
    //         var res =  db.collection('log').find(query).toArray();
    //         if (err) reject(err);
    //         else return(res);
    //     });
    // },
    queryU : function (db,query,cb){
                db.collection('log').find(query).toArray(cb);
    },
    
    getBubbleData : function(db,filters,response) {
            
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
            
            var resultArr = bubbleData(myNew_actionArr,myUpload_actionArr,login,del,delD,delAll);
            resultArr.children[1].children = myUpload_actionArr;
            resultArr.children[2].size = login;
            resultArr.children[3].size = del;
            resultArr.children[4].size = delD;
            resultArr.children[5].size = delAll;

            return response.send( resultArr);
          });
    }



}




// var newActions = ["角色","用户","元数据模板","数据模型","数据库","集合"];
// var loginAction = "登录";
// var uploadActions = ["ImageData","三四级影像数据","DEMData","VectorData","FileData","ModelData"];
// var delActions = ["删除","删除数据","删除所有数据"]



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