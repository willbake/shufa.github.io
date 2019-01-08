const http=require("http"); //引入核心http模块
const fs=require("fs");
const mime=require("mime"); //解决文件类型
const moment = require("moment");
const url=require("url");

let pKing = 0;
//创建一个函数，req代表客户端，res代表服务器可写流
let listener=(req,res)=>{
    let {query,pathname}=url.parse(req.url,true);
    if(pathname==='/'){
        pathname='/index.html'
    }else if(pathname.indexOf('.')=='-1'){
        pathname= pathname +'.html'
    }
    getResources(pathname, res);
}

let getResources = function(pathname, res){
    fs.readFile(pathname.substr(1), function(err, data) {
        if(err) {  
            console.log(err);
            res.writeHead(404,{'Content-Type': 'text/html'});  
        } else {
            res.writeHead(200,{'Content-Type': mime.getType(pathname)+';charset=utf-8'});
            if(pathname.indexOf('png')){
                res.write(data,"binary");
            }else{
                res.write(data.toString());
            }    
        }
        //发送响应数据 
        res.end();  
    });
}
let resetPKing = function(){
    pKing--;
}
let port=8088;
//创建一个服务，放入一个监听函数，
let server=http.createServer(listener);

server.listen(port,function () {
 //启动成功后
 console.log(`start${port}`);
})
module.exports.resetPKing = resetPKing;