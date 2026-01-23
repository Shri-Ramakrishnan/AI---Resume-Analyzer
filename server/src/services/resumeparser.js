const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

console.log("✅ resumeparser loaded");

const extractTextFromResume = async (buffer, mimeType) => {
 
  if (mimeType === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file format");
};

module.exports = extractTextFromResume;
