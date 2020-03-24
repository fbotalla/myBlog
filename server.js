const express = require('express');
const path = require('path');


const {Pool} = require("pg");


const connectionString = process.env.DATABASE_URL || "postgres://pro_user:default@localhost:5432/projecttwo";

const pool = new Pool({connectionString:connectionString});


const app = express();
app.use(express.static("public"))
// app.set("views","display")
// app.set("view engine", "ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// app.use(express.static("public"))
// app.set("views","display")
// app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.listen(port,function(){
    console.log("listening on port " + port );
});

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + '/display/home.html'));
});


app.post("/account", (req,res)=>{
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
    pool.query('SELECT comment FROM comments WHERE project_id =' + id, (err,result) =>{

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

    const query = {
        text: 'INSERT INTO comments (project_id,comment) VALUES($1, $2)', 
        values: [id,comment],
    }
    pool.query(query, (err,result)=>{
        if(err){
            return console.log(err);
        }else{
            console.log('Inserted')

        }
    });
})
