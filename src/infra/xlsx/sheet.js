const XLSX = require("xlsx");

const createJSONFromSheet = (file, sheetName) => {
  const workbook = XLSX.readFile(file);
  const activeSheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(activeSheet);
};

module.exports = { createJSONFromSheet };
