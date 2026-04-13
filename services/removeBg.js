const axios = require("axios");
const FormData = require("form-data");

async function removeBackground(buffer, apiKey) {
  try {
    const form = new FormData();
    form.append("image_file", buffer, "photo.png");
    form.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "X-Api-Key": apiKey
        },
        responseType: "arraybuffer"
      }
    );

    return Buffer.from(response.data);
  } catch (err) {
    console.log("⚠️ BG remove skipped");
    return buffer;
  }
}

module.exports = removeBackground;
