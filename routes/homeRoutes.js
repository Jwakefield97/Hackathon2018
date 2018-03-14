const express = require("express"),
      route = express.Router(),
      dao = require("../modules/dao.js"); 
      
let authentication = function(req,res,next){
    if(req.session.username){
        req.session.touch(); 
        next(); 
    }else{
        res.redirect('/');
    }
}
route.use(authentication); 

//default route for home -- /home 
route.get("/",(req,res)=>{
    res.render("home.pug"); 
}); 

route.get("/getAdditionalInfo",(req,res)=>{
    dao.getAdditionalInfo(req.session.username).then(result=>{
        res.json(result[0]); 
    }).catch(err=>{
        res.send("error"); 
    }); 
}); 

route.post("/updateProfile",(req,res)=>{
    dao.updateProfile(req.session.username,req.body).then(result=>{
        res.send(result);  
    }).catch(err=>{
        console.log(err); 
    });  
}); 

module.exports = route; 