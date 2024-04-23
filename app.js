const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=31&lon=30&appid=29de8295d9d20221b3987fa00140d711&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The Tempreture in Cairo is " + temp + " degrees Celcius.</h1>");
      res.write("<p>The Weather is currently " + desc + ".</p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
