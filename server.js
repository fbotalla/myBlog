const express = require('express');
const path = require('path');
const router = require('router');
const passport = require('passport');
const {Pool} = require("pg");
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const validator = require('validator');

const connectionString = process.env.DATABASE_URL || "postgres://pro_user:default@localhost:5432/projecttwo";
const pool = new Pool({connectionString:connectionString});

const salt = 10;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();


app.set("views","display")
app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}




app.listen(port,function(){
    console.log("listening on port " + port );
});

app.get("/", function(req,res){
   res.render('register',{error:null,errorLogin:null});
    
    //res.sendFile(path.join(__dirname + '/display/home.html'));
    
});

app.get("/home",function(req,res){
    //res.sendFile(path.join(__dirname + '/display/home.html'));
    res.render('home');
});

app.post("/project", (req,res)=>{
    var id = req.query.project_id;

    console.log("ID: " + id);

    pool.query('SELECT name,languange,image,description FROM project WHERE project_id =' + id, (err,result) =>{
        if(err){
            return console.log(err);
        }else{
            console.log('Project: ', JSON.stringify(result.rows[0]));
            res.json(result.rows[0]);
        }
    });
})



app.post("/getComments",(req,res) =>{
    var id= req.query.project_id;
    console.log("Comment id= " + id);
    pool.query('SELECT comment,username FROM comments WHERE project_id =' + id, (err,result) =>{

        if(err){
            return console.log(err);
        }else{
            res.json(result.rows);
        }
    });

})



app.post("/addComment", (req,res)=>{
    var id = req.query.project_id;
    console.log("ID is: " + id);
    var comment = req.query.comment;
    console.log("Comment is: " +comment);
    var username = req.query.username;
    console.log("User is: " +username);

    const query = {
        text: 'INSERT INTO comments (project_id,comment,username) VALUES($1, $2,$3)', 
        values: [id,comment,username],
    }

    pool.query(query, (err,result)=>{
        if(err){
            return console.log(err);
        }else{
            console.log('Inserted')

        }
    });
})

app.post("/login",urlencodedParser,(req,res) =>{
    var email = validator.escape(req.body.email);
    var password = validator.escape(req.body.password);

    const query = {
        text: "SELECT password FROM person WHERE email = $1",
        values: [email],
    }


    pool.query(query, (err,result)=>{
        //console.log(result.rows);
       
        if(result.rows.length > 0){
            var hash = result.rows[0].password;
            console.log(password);
            bcrypt.compare(password, hash, function(err, result){
                console.log(result);
                if(result == true){
                const queryUser = {
                    text: "SELECT username FROM person WHERE email = $1",
                    values: [email],
                }
                pool.query(queryUser,(err,result)=>{
                    console.log(result.rows);
                    res.render('home',{person:result.rows[0].username});
                });
                
                }
                else{
                    var error = "Check your password!"
                    res.render('register', {error: null,errorLogin:error});
                }
             }
            )}else{
                var error = "Check your email!"
                res.render('register', {error: null,errorLogin:error});
            }
    
    })

})

app.post("/checkUser",urlencodedParser, (req,res) => {
    var name = validator.escape(req.body.name);
    var last_name = validator.escape(req.body.last_name);
    var username = validator.escape(req.body.username);
    var email = validator.escape(req.body.email);
    var password = validator.escape(req.body.password);

    

    console.log("Name: " + name+ "Lastname: " +last_name+ " Username: " + username + " Email: " + email + " Password: " + password);

    const searchQuery = {
        text: 'Select * FROM person WHERE email = $1',
        values: [email],
    }
    
    pool.query(searchQuery, (err,result)=>{
        console.log(result.rows);
        if(result.rows.length > 0){
            console.log("found it");
            var error = "This email already exists!";

            // UNCOMMENT THIS
            res.render('register', {error:error,errorLogin:null});

            //PUT THIS ON AFTER THE ELSE STATEMENT
           // res.render('home',{person:username})

        }else{
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
            const insertQuery ={
                text: 'INSERT INTO person (name,last_name,email,username,password) VALUES($1,$2,$3,$4,$5)',
                values: [name,last_name,email,username, hash],
            }
            pool.query(insertQuery, (err,result)=>{
                if(err){
                    return console.log(err);
                }else{
                    res.render('home',{person:username})
                    console.log('Inserted')
                  
                  
        
                }
            });
        });
        }
    })

   // console.log("Username: " + username + " Email: " + email + " Password: " + password);
});

