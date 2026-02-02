import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import Categories from "./Categories";
import NotFound from "./NotFound";

export default function CategoryContainer() {
  const { categoriaId } = useParams();

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredProducts = products.filter(
          (product) => product.category === categoriaId,
        );

        if (filteredProducts.length > 0) {
          resolve(filteredProducts);
        } else {
          reject("No se encontraron productos para esta categoría");
        }
      }, 500);
    });

    getProducts
      .then((res) => {
        setItems(res);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setItems([]);
      });
  }, [categoriaId]);

  if (error) {
    return <NotFound />;
  }

  return <Categories categoriaId={categoriaId} items={items} />;
}
