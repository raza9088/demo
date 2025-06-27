const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API Stubs

// GET /api/session - Get current mining session
app.get('/api/session', (req, res) => {
    // Logic to get session data
    res.json({
        isActive: false,
        startTime: null,
        endTime: null,
        earnedPi: 0
    });
});

// POST /api/session/start - Start a new mining session
app.post('/api/session/start', (req, res) => {
    // Logic to start a session
    res.json({
        success: true,
        message: 'Mining session started.',
        session: {
            isActive: true,
            startTime: new Date().toISOString(),
            endTime: new Date(new Date().getTime() + 5 * 60 * 60 * 1000).toISOString(),
            earnedPi: 0
        }
    });
});

// GET /api/wallet - Get wallet details
app.get('/api/wallet', (req, res) => {
    // Logic to get wallet data
    res.json({
        address: 'GABC...XYZ',
        balance: 100.5,
        kycStatus: 'Verified'
    });
});

// POST /api/wallet/connect - Connect a wallet
app.post('/api/wallet/connect', (req, res) => {
    // Logic to connect a wallet (using PiConnect SDK)
    const { walletAddress } = req.body;
    res.json({
        success: true,
        message: `Wallet ${walletAddress} connected.`
    });
});

// GET /api/stats - Get global stats
app.get('/api/stats', (req, res) => {
    res.json({
        globalPiMined: 12345678.90,
        activeSessions: 12345,
        referralStats: 5678
    });
});


app.listen(port, () => {
    console.log(`PiPortal backend listening at http://localhost:${port}`);
}); 