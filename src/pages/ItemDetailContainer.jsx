import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import ItemDetail from "../components/ItemDetail";
import NotFound from "./NotFound";

export default function ItemDetailContainer() {
  const { categoriaId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundItem = products.find(
          (product) =>
            product.id === Number(itemId) && product.category === categoriaId,
        );
        if (foundItem) {
          resolve(foundItem);
        } else {
          reject("Error: Item no encontrado");
        }
      }, 500);
    });

    getItem
      .then((res) => {
        setItem(res);
        setError(null);
      })
      .catch((res) => {
        setError(res);
        setItem(null);
      });
  }, [categoriaId, itemId]);

  if (error) {
    return (
      // <div>
      //   <h2>{error}</h2>
      // </div>
      <NotFound />
    );
  }

  if (!item) {
    return <p>Cargando...</p>;
  }

  return <ItemDetail item={item} />;
}
