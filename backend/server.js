const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper function to read from db.json
const readDb = () => {
    if (!fs.existsSync(DB_PATH)) {
        return { comments: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Error parsing db.json:", e);
        return { comments: [] };
    }
};

// Helper function to write to db.json
const writeDb = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};

// GET /api/comments
app.get('/api/comments', (req, res) => {
    try {
        const db = readDb();
        const sortedComments = db.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(sortedComments);
    } catch (error) {
        console.error('Error reading comments:', error);
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

        const db = readDb();
        const newComment = {
            id: Date.now().toString(),
            userName,
            content,
            createdAt: new Date().toISOString(),
        };

        if (!Array.isArray(db.comments)) {
            db.comments = [];
        }

        db.comments.push(newComment);
        writeDb(db);

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ error: 'Failed to save comment' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
