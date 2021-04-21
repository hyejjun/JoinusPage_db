require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.SERVER_PORT;

app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
    autoescape:true,
});

app.use(bodyParser.urlencoded({extended:false}));

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'test_db',
});
connection.connect();

//설정해주는 부분 - 여기까지는 외워야 하는 부분

// 여기서 부터 get post 부분

app.get('/',(req,res)=>{
    res.render('index.html',{
        
    });
});

app.post('/join',(req,res)=>{
    console.log(req.body);

    let userid = req.body.id;
    let userpw = req.body.pw;
    let username = req.body.name;
    let gender = req.body.gender;

    let sql = `insert into user(id,pw,name,gender) values('${userid}','${userpw}','${username}','${gender}')`;

    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);

            res.render('join.html',{
                user_id : userid,
                user_pw : userpw,
                user_name : username,
                user_gender : gender,
            });  
        }
    });
});

app.listen(port,()=>{
    console.log(`server start port : ${port}`)
});