import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

// aca traigo todos los productos
export async function getProducts() {
  const productsCol = collection(db, "packages");
  const snapshot = await getDocs(productsCol);

  return snapshot.docs.map((d) => ({
    ...d.data(),
    id: d.id,
  }));
}

// aca traigo un producto por id (document id)
export async function getProductById(id) {
  const ref = doc(db, "packages", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    ...snap.data(),
    id: snap.id,
  };
}

// aca traigo productos por categoría
export async function getProductsByCategory(category) {
  const productsCol = collection(db, "packages");
  const q = query(productsCol, where("category", "==", category));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    ...d.data(),
    id: d.id,
  }));
}

//aca creo una orden
export async function createOrder(order) {
  const ordersCo = collection(db, "orders");

  const newOrder = {
    ...order,
    createAt: serverTimestamp(),
  };

  const docRef = await addDoc(ordersCo, newOrder);
  return docRef.id;
}

export async function createOrderAndUpdateStock(order) {
  const orderId = await runTransaction(db, async (transaction) => {
    for (const item of order.items) {
      const itemId = String(item?.id ?? "");
      if (!itemId) throw new Error("Hay un item del carrito sin id.");
      const productRef = doc(db, "packages", itemId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error(`Producto ${itemId} no encontrado`);
      }

      const data = productSnap.data();
      const currentStock = Number(data.stock ?? 0);
      if (currentStock < item.quantity) {
        throw new Error(
          `Stock insuficiente para "${data.title ?? item.title}". Disponible: ${currentStock}`,
        );
      }
    }

    // saco stock
    for (const item of order.items) {
      const itemId = String(item?.id ?? "");
      if (!itemId) throw new Error("Hay un item del carrito sin id.");
      const productRef = doc(db, "packages", itemId);
      const productSnap = await transaction.get(productRef);
      const currentStock = Number(productSnap.data().stock ?? 0);

      transaction.update(productRef, {
        stock: currentStock - item.quantity,
      });
    }

    // creo orden
    const ordersCol = collection(db, "orders");
    const newOrderRef = doc(ordersCol); // genera un id sin escribir aún

    transaction.set(newOrderRef, {
      ...order,
      createdAt: serverTimestamp(),
    });

    // devuelvo el id
    return newOrderRef.id;
  });

  return orderId;
}
