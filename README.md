# 📸 Passport Photo Pro

> AI-powered passport photo generator with background removal, smart auto-crop, color palette backgrounds, PDF sheet export, and optional bring-your-own API key support.

Created with ❤️ by **Vaibhav Chauhan**

---

## ✨ Features

* 🤖 **AI Background Removal** using **remove.bg API**
* ✂️ **Auto Crop + Manual Crop** with Cropper.js
* 👤 **Smart Face-Focused Crop** for passport-style framing
* 🎨 **Background Color Palette**

  * White
  * Light Blue
  * Light Red
  * Gray
* 📄 **Passport Photo PDF Sheet Generator**
* 🧠 **AI Validation (Gemini / GPT Ready)**
* ⚙️ **Settings Modal for Replaceable API Keys**
* 💾 **LocalStorage-based API key saving**
* 🆓 **Works even without AI keys** (fallback mode)

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* Cropper.js

### Backend

* Node.js
* Express.js
* Multer
* Sharp
* pdf-lib
* Axios

### AI / APIs

* remove.bg API → background removal
* Gemini / OpenAI API → passport photo validation

---

## 🚀 How It Works

```text
Upload Photo
   ↓
Auto Crop / Manual Crop
   ↓
Main Subject Focus
   ↓
AI Background Removal (optional)
   ↓
Background Color Apply
   ↓
Passport Size Resize
   ↓
PDF Sheet Generate
   ↓
AI Validation Report (optional)
```

---

## ⚙️ API Key Setup

This app uses **Bring Your Own API Key (BYOK)**.

### 🔹 remove.bg API Key

Used for:

* background removal
* transparent cutout
* clean passport style output

### 🔹 Gemini / OpenAI API Key

Used for:

* AI photo validation
* face centering feedback
* lighting suggestions
* passport rejection checks

### 📍 Where to paste API keys

1. Open the app
2. Click the **⚙️ Settings icon**
3. Paste your keys into:

   * `remove.bg API key`
   * `Gemini / OpenAI API key`
4. Click **Save Settings**

Keys are stored locally in browser **localStorage**.

---

## ▶️ Local Setup

```bash
npm install
node server.js
```

Open:

```text
http://localhost:5000
```

---

## 📁 Project Structure

```bash
Passport-photo-maker/
├── public/
│   └── index.html
├── routes/
│   └── process.js
├── services/
│   ├── removeBg.js
│   └── faceCrop.js
├── server.js
├── package.json
└── README.md
```

---

## 🧠 AI Features Roadmap

* 👤 real face detection
* 📏 country passport presets
* 🪪 visa photo validator
* 👔 formal dress AI suggestions
* 🌍 country-wise passport standards
* ✨ photo enhancement

---

## 🙌 Credits

### 👨‍💻 Developer

**Vaibhav Chauhan**

Built with passion for real-world useful AI tools 🚀

If you like this project, feel free to ⭐ the repo.

---

## 📜 License

Free to use for learning and personal projects.
