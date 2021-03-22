const http = require('http');
const url =require('url');
const mysql = require('mysql');
const db = mysql.createConnection({
    user:"mtownonl_josh",
    password:"!!JOsh1234",
    host:"localhost",
    database:"mtownonl_TermProject",
});
console.log("doing something");
getDB();
const server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type':'application/json',"Access-Control-Allow-Origin": "*"})
    console.log(request.method)
    console.log(request.param)
    if (request.method == 'POST') {
        console.log('POST')
        let body = ''
        request.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
        })
        request.on('end', function() {
            console.log('Body: ' + body)
            let myJson = JSON.parse(body);
            updateDB(myJson);
            console.log(myJson);
            response.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*"})
            response.end('post received')
        });
    }else if(request.method == 'OPTIONS') {
        response.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"})
        response.end('cores BS is done!')
    }else if(request.method =='PUT'){
        console.log("i got a put request!!");
        let body = ''
        request.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
            let myJson = JSON.parse(body);
            deleteDB(myJson);
            response.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*"})
            response.end('put received')
        });
    }else if(request.method == 'GET'){
        //let sql = "SELECT * FROM lab01 WHERE 5";
        //result = listenDB(db,sql,"getting info from DB");
        sql = "SELECT * FROM lab01 WHERE 1";
        db.query(sql,function (err,result){if(err) throw err; 
            index= result;
            console.log(result);
            let myJson = JSON.stringify(result);
            response.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"text/html" });
            response.end(myJson);
        });    
        
    }
     
}).listen();
function deleteDB(body){
    sql = "DELETE FROM `lab01` WHERE `lab01`.`quetionID` = "+body.quetionID+"";
    talkDB(db,sql,("deleting DB lab01"))
    sql = "DELETE FROM `lab02` WHERE `lab02`.`quetionID` = "+body.quetionID+"";
    talkDB(db,sql,("deleting DB lab02"))
}
function updateDB(body){
    deleteDB(body);
    testDB(body);
}

function talkDB(db,sql,msg){
    db.query(sql,function (err,result){if(err) throw err; 
        console.log(msg);
    });
}
function listenDB(db,sql,msg){
    let index;
    db.query(sql,function (err,result){if(err) throw err; 
        //res.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"});
        console.log(msg);
        index= result;
        console.log(result);
    });
    return index;
}
function testDB(body){
    let letter = ["a","b","c","d","e","f","g","h","i","j","k"];
    for(i =0; i <body.questNum; i++){
        sql = "INSERT INTO lab02 (ansID, quetionID, ans, ansL) VALUES (NULL, '"+body.quetionID+"', '"+body[letter[i]]+"', '"+letter[i].toUpperCase()+"')";
        talkDB(db,sql,("updaing DB lab02"))
        console.log(sql);
    }
    sql = "INSERT INTO lab01 (quetionID, question, answer) VALUES ('"+body.quetionID+"', '"+body.question+"', '"+body.answer+"')";
    talkDB(db,sql,("updaing DB lab01"))
    console.log("this is working");
}
function getDB(){
    let sql = "SELECT * FROM lab01 WHERE 5";
    result = listenDB(db,sql,"getting info from DB");
    sql = "SELECT * FROM lab02 WHERE 5";
    console.log( listenDB(db,sql,"getting info from DB"));
    //let myJson = JSON.stringify(result);
    //res.end(myJson);
    
}