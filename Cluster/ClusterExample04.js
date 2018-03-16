var cluster = require("cluster")
var http = require("http")
var numCPUs = require("os").cpus().length
if (cluster.isMaster) {
    i = 0
    while (i < numCPUs) {
        cluster.fork()
        i++;
        cluster.on('fork', (worker) => console.log('forked worker ' + worker.process.pid));

        cluster.on("listening", (worker, address) =>
            console.log("worker " + worker.process.pid + " is now connected to " +
                address.address + ":" + address.port));

        cluster.on("exit", (worker, code, signal) =>
            console.log("worker " + worker.process.pid + " died"));
    }
} else {
    let app = require("express")()
    let server = require("http").createServer(app)
    server.listen(8000);

    app.get("/", (req, res) => {
        console.log('request handled by worker with pid ' + process.pid);
        res.writeHead(200);
        res.end("hello world\n");
    });

    app.get('/close', (req, res) => {
        console.log('Closing the server...')

        server.close(() => {
            console.log('--> Server call callback run !!')

            process.exit()
        })
    })

}