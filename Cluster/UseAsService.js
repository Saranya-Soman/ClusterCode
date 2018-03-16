var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Hello World I from windows Service \n');
});

server.listen(4000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:4000/')