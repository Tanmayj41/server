
var express=require("express");
var router = express();

var mysql = require("mysql");
var config = require("config");
var connection = mysql.createConnection({
    host:config.get("host"),
    user:config.get("user"),
    password:config.get("password"),
    database:config.get("database")
})
connection.connect();
router.get("/",(request,response)=>{
    var sql = `select * from emp`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})
router.use(express.json());

router.post("/",(request,response)=>{
    if(validate(request))
    {
        var sql = `insert into emp values(${request.body.No},'${request.body.Name}','${request.body.Address}')`;
        connection.query(sql,(err,result)=>{
            if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else
            {
                response.send(JSON.stringify(err));
            }
        })
    }
})
var joi = require("joi");
function validate(request)
{
    var validationSchema = 
    {
        No:joi.number().required(),
        Name:joi.string().required(),
        Address:joi.string().required()
    }
    return joi.validate(request.body,validationSchema);
}

router.put("/:No",(request,response)=>{
    var sql = `update emp set Name='${request.body.Name}' , Address='${request.body.Address}' where No=${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})
router.delete("/:No",(request,response)=>{
    var sql = `delete from emp where No=${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})

router.get("/:No",(request,response)=>{
    var sql = `select * from emp where No=${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})

module.exports = router;
