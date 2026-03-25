const express = require('express');
const cors = require('morgan');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP REQUEST logging

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

// Server uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Basic route for testing
app.get('/', (req, res) =>{
    res.send('File Upload Server is running')
});

// Start the server
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, uploaDir);
    },
    filename: function (req, file, cb){
        // Create unique filename
        const timestamp = Data.now();
        const orginalName = file.originalname;
        cb(null, '${orginalName}');

    } 
});

// Configure file filter
const fileFilter = (req, file, cb) => {
    // Accept only specific mime types
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed'), false);

    }
};

// Create the multer instance 
const upload = multer({
    storage: storage,
    limits:{
        filesize: 5 * 1024 * 1024 // 5MB in bytes
    },
    fileFilter: fileFilter
});

