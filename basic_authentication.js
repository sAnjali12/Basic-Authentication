const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post("/signUp",function(req,res){
    var user = {
        userName:req.body.userName,
        emailId:req.body.emailId,
        password:req.body.password,
        mobileNo:req.body.mobileNo
    }
    var data = fs.readFileSync("loginData.json");
    data = data.toString();
    var jsonData = JSON.parse(data)
    if (req.body.password.length<6 || req.body.password.length>15){
            res.end("wrong password")
        }
    for (index in jsonData){
        if(jsonData[index].emailId==req.body.emailId){
            return res.send("Your emailId Is Already Exist")
            
        }
    }
    user.id = jsonData.length + 1;
    jsonData.push(user)
    fs.writeFileSync("loginData.json", JSON.stringify(jsonData,null,2))
    return res.json(jsonData)

})

const port = 8000
app.listen(port,()=>
   console.log(`my server is listning port....${port}`)
);