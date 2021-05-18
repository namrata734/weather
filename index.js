const express = require("express");
 const bodyParser = require("body-parser"); // allows to look for post req
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true})); // using
app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
})


app.post("/", function(req, res){
  var input = req.body.place; // by bodyparser
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid=ca67bd9204668116de78ae8ea3105439&units=metric";
  https.get(url, function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
        console.log(temp); // print in git bash
        res.write("<p>"+temp+"</p>");
        res.write(weatherDes)
        res.send()
    } )
  })
})

app.listen(3000, function(req, res){
  console.log("server 3000");
})
