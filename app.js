const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const https =require("https");

const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");//passing data from server app.js to the browser via this send method and response from server
});

app.post("/",function(req,res){
  const firstName =req.body.fname;
  const lastName = req.body.lname;
  const email =req.body.email;


  const data ={
    members :[
      {
        email_address: email,
        status:"subscribed" ,
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }

  }
]
};


const jsonData =JSON.stringify(data);

const url ="https://us14.api.mailchimp.com/3.0/lists/d0b9658154"

const options = {
  method: "post",
  auth:"sumonM:f0e631ebc8f74d2880afcad335161469-us14"
}

const request = https.request(url,options,function(response){

  if(response.statusCode ===200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(3000,function(){
  console.log("server activated");
});

//API_KEY:  f0e631ebc8f74d2880afcad335161469-us14
//list_id:   d0b9658154
