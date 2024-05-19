var admin = require("firebase-admin");

var serviceAccount = require("./acheva-9ca71-firebase-adminsdk-bwyd6-b7fb683f7d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export { bucket };
