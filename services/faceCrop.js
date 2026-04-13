const sharp = require("sharp");

async function cropMainPerson(buffer) {
  const targetWidth = 413;
  const targetHeight = 531;
  const padding = 24;

  const trimmed = sharp(buffer).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const metadata = await trimmed.metadata();

  if (!metadata.width || !metadata.height) {
    return sharp(buffer)
      .resize(targetWidth, targetHeight, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();
  }

  const innerWidth = Math.max(1, targetWidth - padding * 2);
  const innerHeight = Math.max(1, targetHeight - padding * 2);

  const resized = await trimmed
    .resize(innerWidth, innerHeight, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

module.exports = cropMainPerson;
