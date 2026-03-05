const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Cargo l llave privada (service account)
const serviceAccountPath = path.join(__dirname, "..", "secrets", "key.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    "❌ No se encontró secrets/key.json. Revisá tu carpeta secrets.",
  );
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// inicio Firebase Admin (evita doble init)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function clearCollection(collectionName, batchSize = 400) {
  const colRef = db.collection(collectionName);

  let totalDeleted = 0;

  while (true) {
    const snapshot = await colRef.limit(batchSize).get();

    if (snapshot.empty) break;

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();

    totalDeleted += snapshot.size;
    console.log(
      `🧹 Borrados ${snapshot.size}. Total borrados: ${totalDeleted}`,
    );
  }

  console.log(
    `✅ Colección "${collectionName}" vaciada. Total borrados: ${totalDeleted}`,
  );
}

clearCollection("packages")
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error borrando colección:", err);
    process.exit(1);
  });
