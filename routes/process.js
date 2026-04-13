const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");

const removeBackground = require("../services/removeBg");
const cropMainPerson = require("../services/faceCrop");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

async function handleProcess(req, res) {
  try {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4

    let x = 20;
    let y = 680;

    const width = parseInt(req.body.width || 120);
    const height = parseInt(req.body.height || 150);
    const spacing = parseInt(req.body.spacing || 10);
    const bgColor = req.body.bgColor || "white";
    const userBgKey = req.body.removeBgKey;
    const llmKey = req.body.llmKey;

    for (let file of req.files) {
      const index = file.fieldname.split("_")[1];
      const copies = parseInt(req.body[`copies_${index}`] || 1);

      const mainPerson = await cropMainPerson(file.buffer);

      const bgRemoved = userBgKey
        ? await removeBackground(mainPerson, userBgKey)
        : mainPerson;

      // ✅ auto crop visible subject after bg removal
      const croppedPerson = await cropMainPerson(bgRemoved);

      // ✅ apply selected bg color + resize
      const imageBuffer = await sharp(croppedPerson)
        .flatten({ background: bgColor })
        .resize(width, height)
        .png()
        .toBuffer();

      const image = await pdfDoc.embedPng(imageBuffer);

      for (let i = 0; i < copies; i++) {
        page.drawImage(image, { x, y, width, height });

        x += width + spacing;

        if (x + width > 550) {
          x = 20;
          y -= height + spacing;
        }

        if (y < 50) {
          page = pdfDoc.addPage([595, 842]);
          x = 20;
          y = 680;
        }
      }
    }

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    res.status(500).send("PDF generation failed");
  }
}

router.post("/", upload.any(), handleProcess);

module.exports = router;
