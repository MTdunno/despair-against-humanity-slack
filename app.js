var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('domain.key', 'utf8');
var certificate = fs.readFileSync('domain.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate, requestCert: true, rejectUnauthorized: false};


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var cardsFile = fs.readFileSync("cards.json");
var cardsBlob = JSON.parse(cardsFile);
var blackCards = cardsBlob["blackCards"]
var whiteCards = cardsBlob["whiteCards"]

httpServer.listen(80);
httpsServer.listen(443);

var PORT=8080
// yeah that's probably safe

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/burn', function(req, res){
  console.log(req.body.command)
})

app.get('/test', function (req, res) {
  console.log('I GOT HERE!')
  bc = blackCards[Math.floor(Math.random()*blackCards.length)]
  
  res.send(fillInCard(bc,whiteCards))
})

//app.listen(PORT, function () {
//  console.log('Example app listening on port '+PORT)
//})

function fillInCard(bc, wcs){
  var blanks = bc["pick"]
  var out_text = bc["text"]
  console.log(blanks)
  for(var i =0; i<blanks; i++){
    
    wcText = wcs[Math.floor(Math.random()*wcs.length)]
    console.log(wcText)
    out_text = out_text.replace("\_",wcText)

  }

  return out_text

}
