const http = require('http');
const fs=require("fs");
const requests = require("requests");


const homefile=fs.readFileSync("index.html","utf-8");
const replaceVal = (tempVal,orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
     temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}", orgVal.name);
     temperature = temperature.replace("{%country%}", orgVal.sys.country);
   
     return temperature;


};  
const server=http.createServer((req,res)=>{
  if(req.url="/"){
    
requests(
    "https://api.openweathermap.org/data/2.5/weather?q=${Pune}&appid=${bab281d79e5f1e9755a68d754cc313e7}&units=metric"
    )
 
    .on("data",function(chunk){
        const objdata=JSON.parse(chunk);
        const arrData= [objdata];
        const realTimeData = arrData.map((val)=>{replaceVal(homefile,val).join("");
            res.write(realTimeData);
            
        });
       //console.log(arrData[0].main.temp);
 })
    .on("end",function(err){
        if(err) return console.log("connection closed due to errors",err);
        res.end();
    });

}
});
 server.listen(8000,"127.0.0.1"); 

