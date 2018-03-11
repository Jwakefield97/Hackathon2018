const express = require("express"),
      route = express.Router(); 
      
let authentication = function(req,res,next){
    if(req.session.email){
        next(); 
    }else{
        res.redirect('/');
    }
}
route.use(authentication); 

route.get("/feed",(req,res)=>{
    res.render("feed.pug"); 
}); 


module.exports = route; 