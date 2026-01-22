const fs = require("fs");
const pdfParse = require("pdf-parse");

console.log("✅ resumeparser loaded");

const extractTextFromResume = async (filePath, mimeType) => {
  if (mimeType === "application/pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const content = fs.readFileSync(filePath);
    return content.toString("utf-8");
  }

  throw new Error("Unsupported file format");
};

module.exports = extractTextFromResume;
