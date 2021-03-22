const http = require('http');
const mysql = require('mysql');
const db = mysql.createConnection({
    host:"localhost",
    user:"mtownonl_lab5myslq",
    password:"lab5mysql123",
    database:"mtownonl_TermProject",
});
http.createServer(function (request,response){
    console.log("The server recived a request");
    let sql = "SELECT * FROM `lab02` WHERE 1";
    if (request.method == 'GET') {
        db.query(sql,function (err,result){
            if(err) throw err;
            console.log("it works!!!");
            response.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"text/html" });
            console.log(result);
            let myJson = JSON.stringify(result);
            response.end(myJson);
        });
    }else if(request.method == 'OPTIONS') {
        response.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"})
        response.end('cores BS is done!')
    }
}).listen();