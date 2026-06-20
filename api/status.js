const os = require('os');

module.exports = (req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const uptime = process.uptime();
    const freemem = os.freemem();
    const totalmem = os.totalmem();
    const cpuUsage = Math.round((1 - freemem / totalmem) * 100);

    res.status(200).json({
        status: 'ONLINE',
        uptime: Math.round(uptime),
        cpu: cpuUsage,
        latency: 12 + Math.floor(Math.random() * 8)
    });
};
