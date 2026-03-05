import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import services from "../services";
import Categories from "./Categories";
import NotFound from "./NotFound";

const VALID_CATEGORIES = ["playa", "montañas", "ciudades"];

export default function CategoryContainer() {
  const { categoriaId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setItems([]);

    if (!VALID_CATEGORIES.includes(categoriaId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    services
      .getProductsByCategory(categoriaId)
      .then((res) => setItems(res))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [categoriaId]);

  if (loading) return <div style={{ height: "100vh" }}>Cargando...</div>;
  if (notFound) return <NotFound />;

  return <Categories categoriaId={categoriaId} items={items} />;
}
