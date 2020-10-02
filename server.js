const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');


const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apidatabase'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected to Database');
    }
})



app.get('/', (req,res)=>{
    res.send('This is Working');
    connection.query("SELECT * FROM LoginInfo", function(error, rows,fields){
        if(!!error){
        console.log('Error in the Query');
    }else{
        console.log('Successful Queries');
    }});
    
    
});


app.post('/app/user' , (req, res) => {
    let sql = 'INSERT INTO LoginInfo SET ?'
    const {username, password} = req.body
    let post = {
        username: username,
        password : password
    };
    connection.query(sql, post, (err, res) => {
        
        console.log('success');
        
        // console.log(res);
    });
    res.status(200).json({status : 'account created'});
});

app.post('/app/sites?user={userId}' , (req, res) => {
    let sql = 'INSERT INTO NotesInfo SET ?'
    //const {username, password} = req.body
    let post = {
        userId: req.params.user,
        note : req.body.note
    };
    connection.query(sql, post, (err, res) => {
        
        console.log('success');
        
        // console.log(res);
    });
    res.status(200).json({status : 'account created'});
});




app.post('/app/user/auth',(req, res) => {
    let sql = 'SELECT userId FROM LoginInfo WHERE username = ? '
    const {username, password} = req.body
    let query = connection.query(sql, username, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": "success", "userId": results[0].userId}));
    });
  });


app.listen(3000, ()=>{
    console.log("APP is running");
});



