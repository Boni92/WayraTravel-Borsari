const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// cargo la llave privada (service account)
const serviceAccountPath = path.join(__dirname, "..", "secrets", "key.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ No se encontró secrets/key.json. Revisá el Paso 3.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// inicio Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// obtengo referencia a Firestore
const db = admin.firestore();

// leo el JSON de productos
const packagesPath = path.join(__dirname, "..", "seed", "packages.json");

if (!fs.existsSync(packagesPath)) {
  console.error("❌ No se encontró seed/packages.json. Revisá el Paso 1.");
  process.exit(1);
}

const packages = JSON.parse(fs.readFileSync(packagesPath, "utf-8"));

if (!Array.isArray(packages) || packages.length === 0) {
  console.error("❌ seed/packages.json está vacío o no es un array.");
  process.exit(1);
}

// escribo en batches (Firestore: 500 ops por batch)
async function seedPackages() {
  const colRef = db.collection("packages");

  let batch = db.batch();
  let opCount = 0;
  let written = 0;

  for (const pkg of packages) {
    // ID del documento:
    // - Si pkg.id existe, uso como docId (URLs y concistencia)
    // - Si no existe, es autom.
    const docId = pkg.id ? String(pkg.id) : colRef.doc().id;

    const docRef = colRef.doc(docId);

    const safePkg = {
      ...pkg,
      stock: pkg.stock === undefined ? 0 : Number(pkg.stock),
    };

    batch.set(docRef, safePkg, { merge: true });

    opCount++;
    written++;

    // Si llego al límite de 500
    if (opCount === 500) {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
    }
  }

  // Commit final
  if (opCount > 0) {
    await batch.commit();
  }

  console.log(
    `✅ Seed completado. Documentos escritos/actualizados: ${written}`,
  );
}

seedPackages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error seedeando Firestore:", err);
    process.exit(1);
  });
