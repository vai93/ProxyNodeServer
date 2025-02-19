const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Secret token for secure API access
const TOKEN = process.env.SECRET_TOKEN || "cdfsff123#dsfdsdf"; // Use a strong secret

// ✅ Allow frontend to fetch from the server (Restrict in production)
app.use(cors({
  origin: ["https://yourdomain.com"], // Replace with your frontend domain
  methods: "GET",
  allowedHeaders: "Authorization, Content-Type"
}));

app.use(express.json());

// 🛡️ Secure Firebase Config Endpoint
app.get("/api/firebase-config", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${SECRET_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
