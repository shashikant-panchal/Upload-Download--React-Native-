const express = require('express');
const port = 5000;
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filename = `${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

// Serve uploaded files
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.download(filePath);
});

app.get('/', (req, res) => {
    res.send('Hello, Js');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
