require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const processRoute = require("./routes/process");

const app = express();
const path = require("path");
const upload = multer({ storage: multer.memoryStorage() });

console.log("✅ process route imported");

app.use(cors());

// health route
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "passport-photo-maker",
    routes: ["GET /health", "POST /process", "POST /validate-photo"]
  });
});

app.post("/validate-photo", upload.single("image"), async (req, res) => {
  try {
    const key = req.body.llmKey;

    if (!key) {
      return res.json({ result: "AI key missing. Validation skipped." });
    }

    // placeholder AI logic
    res.json({
      result: "✔ Face looks centered. ⚠ Slight shadow on left side."
    });
  } catch (err) {
    res.status(500).json({ result: "AI validation failed" });
  }
});

// static frontend
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ process route mounted correctly
app.use("/process", processRoute);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
