import ItemList from "../components/ItemList";
import { categoryImages } from "../assets/categoryImages";
import "../styles/Category.css";

export default function Categories({ categoriaId, items }) {
  return (
    <div className="category-page">
      <section
        className="category-hero"
        style={{
          backgroundImage: categoryImages[categoriaId]
            ? `url(${categoryImages[categoriaId]})`
            : "none",
        }}
      >
        <div className="category-hero-overlay" />

        <div className="category-hero-glass">
          <h1>Explorá destinos de {categoriaId}</h1>
          <p>Experiencias diseñadas para descubrir el mundo</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Paquetes destacados</h2>
        </div>

        <div className="featured-panel">
          {items.length > 0 ? (
            <ItemList items={items} />
          ) : (
            <div className="empty-category">
              <h3>Todavia no hay paquetes en esta categoría</h3>
              <p>Estamos preparando nuevos paquetes. Volvé pronto!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
