const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Add this line at the top after imports
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://exposee-backend.onrender.com',
    'https://ayodeyforyou.github.io',
    'https://ayodeyforyou.github.io/',
    'https://ayodeyforyou.github.io/whitesoup',
    'https://ayodeyforyou.github.io/whitesoup/' // with trailing slash
    // Add your custom domain here if you use one, e.g.:
    // 'https://yourdomain.com',
    // 'https://yourdomain.com/'
  ]
}));

// Update these with your email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for Gmail address
    pass: process.env.EMAIL_PASS  // Use environment variable for app password
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Use environment variable for sender
      to: process.env.EMAIL_USER,   // Use environment variable for recipient
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
