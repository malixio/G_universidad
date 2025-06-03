const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Asegúrate de tener este archivo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { db };
module.exports = { db, admin };
// Asegúrate de tener el archivo serviceAccountKey.json en la raíz del proyecto
