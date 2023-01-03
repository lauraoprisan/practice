const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
   
    if('choice' in params){
      const choices = ['rock', 'paper', 'scissors']
      let computerChoice = choices[Math.floor(Math.random(3))];
      
      if(params['choice']== 'rock'){
        let userChoice = 'rock';
      } else if(params['choice']== 'scissors'){
        let userChoice = 'scissors';
      } else if(params['choice']== 'paper'){
        let userChoice = 'paper';
      }

        res.writeHead(200, {'Content-Type': 'application/json'});
        const rules ={
          rock: 'scissors',
          paper: 'rock',
          scissors: 'scissors'
        }
        if(userChoice==computerChoice){
          console.log("Tie")
        } else if(userChoice = rules[computerChoice]){
          console.log("Computer won")
        } else{
          console.log("You won")
        }
      
       
        res.end();
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
