var express = require("express");
var app = express();
var router = require("./routes/emps");
var config = require("config");
var port = parseInt(config.get("port"));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
	next();
})
app.use("/emps",router);

app.listen(port,()=>{
    console.log("server started...");
})
