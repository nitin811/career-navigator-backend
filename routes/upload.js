const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');

// Files memory mein store karo (disk pe nahi)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Sirf PDF files allowed hain!'), false);
  }
});

router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;