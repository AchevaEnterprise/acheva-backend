import CSVToJSON from "csvtojson";
import xlsx from "xlsx";
const JSONToCSV = require("json2csv").parse;
import fs from "fs";
import path from "path";
import { bucket } from "../../config/firebaseConfig";

const spreadsheetToJson = async (destination: string, mimetype: string) => {
  let results: any;

  if (mimetype == "text/csv") {
    await CSVToJSON()
      .fromFile(destination)
      .then((source) => {
        results = source;
      });
  } else {
    const workbook = xlsx.readFile(destination);

    // Choose the sheet you want to convert (assuming it's the first sheet)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    results = await xlsx.utils.sheet_to_json(sheet);
  }

  return results;
};

const jsonToCSV = async (data: any) => {
  const csv = JSONToCSV(data, {
    fields: [
      "studentName",
      "registrationNumber",
      "testScore",
      "practicalScore",
      "continuousAssessment",
      "examScore",
      "total",
      "grade",
    ],
  });
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileDirectory = uniqueSuffix;
  fs.writeFileSync(`src/controllers/uploads/${fileDirectory}.csv`, csv);
  let directory;
  if (process.env.mode == "development") {
    directory = `src/controllers/uploads/${fileDirectory}.csv`;
  } else {
    directory = path.resolve(
      __dirname,
      `src/controllers/uploads/${fileDirectory}.csv`
    );
  }
  const destination = `result-uploads/${fileDirectory}.csv`;
  const url = await uploadFile(directory, destination);
  fs.unlinkSync(directory);
  return url;
};

async function uploadFile(localFilePath: string, destination: string) {
  await bucket.upload(localFilePath, {
    destination: destination,
    public: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  // Get the uploaded file reference
  const file = bucket.file(destination);
  const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

  console.log(`${localFilePath} uploaded to ${destination} ${url}`);
  return url;
}

export { spreadsheetToJson, jsonToCSV };
