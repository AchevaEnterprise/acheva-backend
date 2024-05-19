var admin = require("firebase-admin");

var serviceAccount = {
  type: "service_account",
  project_id: "acheva-9ca71",
  private_key_id: "b7fb683f7dd15dab8c9cb5a38be5d31c1551bf66",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDY4jOAET3nB4LF\n+M5Myo8iqq+GWYeufLV3Aq/KNUbacG6TLRBDov0kvenHkh25MmyYp1ID8TJLKJUX\nsXhoSxYN89rlLuj7cjxIPzv37G6Q0G0xp3HNXvbcxAvloC6SaOP+jaguEY/DGbUW\nfrSdAtHLDEYp5unH6L2QjMkq7UHsMJZW1wunzLizF2V3RaN5LJDlu0u4HW+oInAo\nXQOoarlOgQnQSqGJ5JUFxhwjo7RppeGwMnuluydJh36Yho0ZI/IXcQ55rb8Itzua\nUzRQfkL940c1EdPVu2gR0OS81K5/6ygxqwg/Vd3RWeqPTa2h4r6PvqLxp2pM1m+z\nBqBLY3cVAgMBAAECggEAK+L989zJT24kJsZVjJFyjFvIn+GPBJ5ko/vtsXe9aidV\nIL/+KgmZuu0ZGNK25ApRkkRNYtHUUQQZw00cpdIH2PPu5/BpobP4gdAV5PG5X+Fl\nLyaIbzvXrU2YcLNMqUDDXfexP/06v4p8q9wg1SLEbBeEPSdmSBcPAOiULnULIW1G\nJh5o1xam9zPQeTmrVGv+jlG6UIIuC/rTeBmNow97boUzqlLO9pgmCGJKZznkfZo7\ncfAiqU2PwD9VWFYp2TYHPBZ08euxtA5Yu+QDb4VqBnx/d3KAH2lzI62PWCCNbj5T\nq4w6aYpi8S3NYjobxzWf97iVZu5etJ/g13uLiPyOMQKBgQDv3odH4u+VoezcSG6C\nsbXzw4XoHL31QWGeqGTqtinVRjKlAyB2PmSAYQmgUHBHA9HDfgK1plYMBF8SX6Mh\nwu3ZH4bpiVHkai+8/AN0OQsM4piQYrRL0F6A6Bo7i/xHK+qU3Z0K8QlJRbfHvDuX\nvwcdigxlq0NZTJ31ci+lTogNPQKBgQDnd/aF60Tu/Nfh5MwOXvvcLyCJxqmL6DLZ\nG2oGbALbhPMXhusAOsVv/UmA5tFUcoutxClzDycBJ9Bu7l/vqJCHNhlItioJoRr7\nMTNWlb1d5OIRbRZp/snakIrF2A7+hWB9NVgMz7oIxghqxRq22yhSA5JiqCkPo9lv\nWWWKRWPeuQKBgHkEI+w4qfcsAnwAbwCw98NL2bsJBS0/FykcfA2OafyXteVadn4x\nbDL4wgqHip3JZ4LhiCxtBux5KB308jCOT8FDDqW0CgTbLcqCuptgTBrsF1yA78Vw\nEr2mW9W/AkBF/8urIxfqE21MJzQ12zrrvYNBqo+AoDHlXav/N9qGjE1hAoGAHTc3\nFpArkz62wPxwBSBYCeKo6Lr6i34zbNPY/haEBdEyHbYZ012Xrhr6PBrmMRKELtqj\noLI46hxsYpQT59wO4gIiDttvUufS0AHVyQf9buyE3E44lghi0gOMgIxU2CtdknA5\nPOS7RoA4b8GRLaNb434v6+PtytuThkpyVpGLmYECgYEAoaf1iHdt3Tve31gD1a46\ntMnBFkeIl/DWyoXZd8dHTyj2nWOM4TiNgIM+x0yIE5ENEzWpjn0GVmeWk1iS+Iqp\n3FwgI3wskO+N/CnbpG8N98tfVlNnre/zJ962JlFhvjA8q9CqzlB+BWKLpmf0BAfO\nTRj9Ew/smrvZned1/UcjFWg=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-bwyd6@acheva-9ca71.iam.gserviceaccount.com",
  client_id: "109941518245056387205",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bwyd6%40acheva-9ca71.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export { bucket };
