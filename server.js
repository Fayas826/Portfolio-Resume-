const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const server = http.createServer((req, res) => {
    if (req.url === '/api/status') {
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        const uptime = process.uptime();
        const freemem = os.freemem();
        const totalmem = os.totalmem();
        const cpuUsage = Math.round((1 - freemem / totalmem) * 100);
        res.end(JSON.stringify({
            status: 'ONLINE',
            uptime: Math.round(uptime),
            cpu: cpuUsage,
            latency: 12 + Math.floor(Math.random() * 8)
        }));
        return;
    }

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': req.url.endsWith('.css') ? 'text/css' : 'text/html' });
        res.end(content);
    });
});

server.listen(8000, '0.0.0.0', () => console.log('Server running on 8000'));
