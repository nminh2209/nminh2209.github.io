const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for demo
let users = [];

// Register endpoint
app.post('/api/register', (req, res) => {
    const { fullName, email, password, role } = req.body;
    users.push({ fullName, email, password, role });
    res.json({ success: true, message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ 
            success: true, 
            token: 'demo-token', 
            userId: email,
            role: user.role 
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
