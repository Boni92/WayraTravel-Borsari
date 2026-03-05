import "../styles/ItemListContainer.css";
import { useEffect, useState } from "react";
import services from "../services";
import ItemList from "./ItemList";

export function ItemListContainer() {
  const [playaItems, setPlayaItems] = useState([]);
  const [montañasItems, setMontañasItems] = useState([]);
  const [ciudadesItems, setCiudadesItems] = useState([]);
  const [error, setError] = useState(null);

  const sections = [
    {
      id: "playa",
      title: "Playa",
      subtitle: "Experiencias de mar y relax para recargar energía.",
      items: playaItems,
    },
    {
      id: "montañas",
      title: "Montañas",
      subtitle: "Aventura, altura y paisajes para desconectar.",
      items: montañasItems,
    },
    {
      id: "ciudades",
      title: "Ciudades",
      subtitle: "Explora las urbes y su cultura única.",
      items: ciudadesItems,
    },
  ];

  useEffect(() => {
    const loadCategory = (category, setter) =>
      services.getProductsByCategory(category).then(setter);

    Promise.all([
      loadCategory("playa", setPlayaItems),
      loadCategory("montañas", setMontañasItems),
      loadCategory("ciudades", setCiudadesItems),
    ])
      .then(() => setError(null))
      .catch((err) => {
        setError(err);
        setPlayaItems([]);
        setMontañasItems([]);
        setCiudadesItems([]);
      });
  }, []);

  if (error) {
    return <p style={{ padding: 16 }}>Error cargando productos</p>;
  }
  return (
    <section className="home-section">
      {sections.map((section) => (
        <div key={section.id} className="home-section__block">
          <div className="home-section__header">
            <h2 className="home-section__title">{section.title}</h2>
            <p className="home-section__subtitle">{section.subtitle}</p>
          </div>

          <div className="home-section__slider" id={section.id}>
            <ItemList items={section.items} variant="home" />
          </div>
        </div>
      ))}
    </section>
  );
}
