// server.js
// where your node app starts

// init project
var express = require('express');
var path  = require('path');
var moment = require('moment');
var fs = require('fs');
var app = express();

app.set('port',process.env.PORT ||3000);
app.use(express.static(__dirname + '/views'))
app.get('/',function(req,res){
  res.send('index',function(err){
    if (err) throw err;
  });
});
app.listen(process.env.PORT ||3000);
app.get('/:datestring', function(req,res) {
  var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }


});
