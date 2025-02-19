const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from frontend (CORS policy)
app.use(cors());

// Securely send Firebase credentials to frontend
app.get("/api/firebase-config", (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
});

// Fetch Firestore Data Securely
app.get("/api/get-data", async (req, res) => {
  try {
    const apiKey = process.env.FIREBASE_API_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/yourCollection?key=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    res.status(500).json({ error: "Failed to fetch Firestore data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
