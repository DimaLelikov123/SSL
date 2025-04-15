const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Lelikov Dmytro KP-22\n');
}).listen(8443, () => {
    console.log('HTTPS Server running on https://localhost:8443');
});
