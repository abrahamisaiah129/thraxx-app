const sharp = require('sharp');
const fs = require('fs');

const solidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#2F5CFF"/>
  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="460" fill="white" letter-spacing="10">TX</text>
</svg>`;

const tintedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="460" fill="white" letter-spacing="10">TX</text>
</svg>`;

const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#0B0F1C"/>
  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="460" fill="#2F5CFF" letter-spacing="10">TX</text>
</svg>`;

async function makeIcons() {
  await sharp(Buffer.from(solidSvg)).png().toFile('assets/images/logo.png');
  await sharp(Buffer.from(tintedSvg)).png().toFile('assets/images/logo-tinted.png');
  await sharp(Buffer.from(darkSvg)).png().toFile('assets/images/logo-dark.png');
  console.log('Icons generated successfully.');
}

makeIcons().catch(console.error);
