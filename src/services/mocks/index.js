import { products } from "../../data/products";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  await delay(500);
  return products;
}

export async function getProductById(id) {
  await delay(500);
  const found = products.find((p) => String(p.id) === String(id));
  return found ?? null;
}

export async function getProductsByCategory(category) {
  await delay(500);
  return products.filter((p) => p.category === category);
}
