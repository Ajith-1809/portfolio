require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow all if env var not set
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Helper to read/write DB
const getComments = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data).comments || [];
};

const saveComments = (comments) => {
    fs.writeFileSync(DB_FILE, JSON.stringify({ comments }, null, 2));
};

// GET /api/comments
app.get('/api/comments', (req, res) => {
    try {
        const comments = getComments().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to retrieve comments' });
    }
});

// POST /api/comments
app.post('/api/comments', (req, res) => {
    try {
        const { userName, content } = req.body;
        if (!userName || !content) {
            return res.status(400).json({ error: 'userName and content are required' });
        }

        const comments = getComments();
        const newComment = {
            id: Date.now().toString(),
            userName,
            content,
            createdAt: new Date().toISOString(),
        };

        comments.unshift(newComment);
        saveComments(comments);
        
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ error: 'Failed to save comment' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
