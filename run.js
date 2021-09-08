//misc
var globals = require('node-global-storage');
var lastM = "";
var previousM = "";

// websocket server libs
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8000 })

// http server libs
var express = require('express');
var app = express();

// Proccess capture libs
var spawn = require('child_process').spawn;
var StreamSplitter = require("stream-splitter");
// Process to capture
var bin = "./src/main"
var args = [''];

//---------------------------------------------------

// launch socketserver
console.log("Started Socket server on ws://localhost:8000/ws")
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })

  setInterval(() => {
    if (lastM != previousM) {
        ws.send(lastM);
        previousM=lastM;
    }
  }, 125);
})

// launch web server
console.log("Started Socket server on http://localhost:8080")
app.use(express.static('web'))
app.listen(8080);

// launch process
console.log("Launched process, pipeing to websockets...")
var process = spawn(bin, args);

//capture output
var splitter = process.stdout.pipe(StreamSplitter('\n'));
splitter.on('token', (token) => {
    // console.log(JSON.parse(token.toString('utf8')))
    lastM = token.toString('utf8');
});
process.stderr.on('data', function (data) {
    data += '';
    console.log(data.replace("\n", "\nstderr: "));
});
process.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    process.exit(code);
});

