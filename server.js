const querystring = require('querystring');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');
const fs = require('fs');

let url;
let code;
let domain;
let find1;
let num;
let test;
let url2;
let path2;

// VOIDNET

app.get('/go', function(req, res){
    url = req.query.url;
    url2 = req.query.url;

var string = url;
var character = '/';
var countObject = {} ; 

function characterCount(word, character) {
   var count = 0;
    for (var i = 0; i < word.length; i++) {
       if (word[i] === character) {
           count++;
       }
  }
  return count;
}
for (var i = 0, l = character.length; i < l; i++) {
    var currentChar = character[i];
    num = characterCount(string, currentChar);
}
    
domain = url.split('/');
    domain = domain[0];
url = "https://" + url;
    path2 = url2;
    path2 = path2.split('/', num);
    let count = 0;
    test = "";
    
    for(let i = 0; i <= num - 2; i++)
    {
     test = test + path2[i] + "/";
    }
    
fetch(url).then(function (res) {
        return res.text();
    
    }).then(function (text) {
code = text;
url = url.split("?", 1);
    url = url.toString();
var str = url.split("."); 
var type = str[str.length - 1];
    var data;
    if(type == "png")
    {
        res.setHeader("content-type", "image/png");
         res.setHeader("content-encoding", "delta");
        
    } else{
    if(type == "svg")
    {
        res.setHeader("content-type", "image/svg+xml");
    } else
    {
        if (type == "css")
        {
         res.setHeader("content-type", "text/css");   
        }
        else {
res.setHeader("content-type", "text/html");
    } 
    }
    }
code = code.replace(/href=".\//gi, domain + '/');
code = code.replace(/href="(?!https:\/\/|\/)/gi, url2 + '/');
code = code.replace(/href="\//gi, domain + '/');
code = code.replace(/content="\//gi, 'content="' + url2 + '/');
code = code.replace(/action="\//gi, 'content="' + domain + '/');
code = code.replace(/a href="https\:\/\/www./gi, 'a href="');
code = code.replace(/src="\//gi, 'src="' + url2 + '/');
code = code.replace(/url\("\//gi, 'url("' + url2 + '/');
    res.send(code);
return;
    });
});

// PAGE NAVIGATION //

// The Following Code is for the Main Pages

app.use(express.static('public'))

app.get('/', function(req, res){
res.sendFile('/pages/index.html', { root: __dirname + '/public' });
});

app.get('/surf', function(req, res){
res.sendFile('/pages/surf.html', { root: __dirname + '/public' });
});

app.get('/credits', function(req, res){
res.sendFile('/pages/credits.html', { root: __dirname + '/public' });
});

app.get('/chat', function(req, res){
res.sendFile('/pages/chatbox.html', { root: __dirname + '/public' });
});

app.get('/home', function(req, res){
res.sendFile('/pages/home.html', { root: __dirname + '/public' });
});

app.get('/play', function(req, res){
res.sendFile('/pages/games.html', { root: __dirname + '/public' });
});

// Proxy Pages

app.get('/py', function(req, res){
res.sendFile('/surfpages/pydodge.html', { root: __dirname + '/public' });
});

app.get('/voidnet', function(req, res){
res.sendFile('/surfpages/VoidNet.html', { root: __dirname + '/public' });
});

app.get('/womginx', function(req, res){
res.sendFile('/surfpages/womginx.html', { root: __dirname + '/public' });
});

app.get('/alloy', function(req, res){
res.sendFile('/surfpages/alloy.html', { root: __dirname + '/public' });
});

app.get('/search', function(req, res){
res.sendFile('/pages/search.html', { root: __dirname + '/public' });
});

// Games

app.get('/flash', function(req, res){
res.sendFile('/gpages/flash.html', { root: __dirname + '/public' });
});

app.get('/emulate', function(req, res){
res.sendFile('/gpages/emulators.html', { root: __dirname + '/public' });
});

app.get('/flashem', function(req, res){
res.sendFile('/gpages/emulators/ruffle/index.html', { root: __dirname + '/public' });
});

app.get('/html5', function(req, res){
res.sendFile('/gpages/html5.html', { root: __dirname + '/public' });
});

// 404 Page

app.use(function (req, res, next) {
  res.status(404).sendFile('/pages/error.html', {root: __dirname + '/public'})
})


// DEPLOYMENT

var heroku = process.env.ONHEROKU
if(heroku == 1) {

PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server is Running at localhost:${ PORT }`)});

} else {
config = require('./config.json'),
PORT = config.port;

app.listen(PORT, () => {
console.log(`Server is Running at localhost:${ PORT }`);
});
}