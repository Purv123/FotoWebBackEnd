//imports
const http = require('http');
const fs = require('fs');
const app = require('./app')

// read the config file for port and host
const { host, port } = JSON.parse(fs.readFileSync('./config.json'))

const server = http.createServer(app);

server.listen(port, host, () => {

    console.log('Listening @ ' + port);
})

// to close the server properly when the server is terminated
shutDownServer = () => {

    // closing the server
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        process.exit(0);
    });

    // forcefully closing the server after the timeout
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 3000);
}

// SIGTERM signal will be received when Ctrl + C is pressed to quit
process.on('SIGTERM', shutDownServer);
process.on('SIGINT', shutDownServer);

// if the app crashes because of "Error: listen EADDRINUSE: " then run the following commands in cmd
// netstat -aon | Find "Port No" (to get the process ID of the process running on that Port)
// taskkill /F /PID "Process ID" (to kill the process )