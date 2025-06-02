const {Client} = require('pg');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const cnct = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: "password",
    database: "democlient"
})

cnct.connect()
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log(err);
})

app.get("/", function(req, res){
    res.send("Hello");
})

app.post("/contact", function(req, res){
    const {name, email, date, phone, message} = req.body;
    try {
        
    const contact_data = 'INSERT INTO contacttable (name, email, date, phone, message) VALUES ($1, $2, $3, $4, $5)';
    cnct.query(contact_data, [name, email, date, phone, message], (err, result)=>{
        if(err){
            res.status(401).send(err);
            console.log(err.message);
        }else{
            res.status(200).json({
                data: "Successfully Added to database."
            });
        }
    });
    } catch (error) {
        console.log(error);
    }
})

app.get("/client", function(req, res){

    try {
         const fetch_query = "SELECT * FROM contacttable ORDER BY date DESC";
    cnct.query(fetch_query, (err, result)=>{
        if(err){
            res.status(401).send(err.message);
        }else{
            res.status(200).send(result.rows);
        }
    })
    } catch (error) {
        console.log(error);
    }
   
})

app.listen(3000, function(){
    console.log("Running on port 3000");
})