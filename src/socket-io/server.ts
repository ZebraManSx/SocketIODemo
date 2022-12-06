import express, { Application, Request, Response } from 'express'
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

const app: Application = express();
const httpServer = http.createServer(app);  
const io = new Server(httpServer,{ /* options */ });

io.on("connection", (socket) => {
  console.log('socket.io connected...');
  socket.on('Hi',(data)=>{
      console.log("Hi "+data+ " Your welcome");
  });
  socket.emit("hello", "socket.io server");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('register request', (msg) => {
    console.log('OK recieve register request with data :' + msg)
    io.emit('register response', '['+msg+'] register completed...');
  });
  
});

httpServer.listen(3000);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req:Request, res:Response) => { 
      res.send('Hello World!')
})

app.get('/signup', (req, res, next) => {
  console.log("views is : "+path.join(__dirname,'../views'));
  let options = {
      root: path.join(__dirname,'../views',),
      headers: {
          'Content-Type': 'text/html; charset=UTF-8'
      }
  };

  res.sendFile('/signup.html', options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent: signup.html');
      }
  });
});


app.post('/api/users/create', (req:Request, res:Response) => { 
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  console.log(name+","+email+","+password);

  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})


app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname,'../views',) + '/chat.html');
});
