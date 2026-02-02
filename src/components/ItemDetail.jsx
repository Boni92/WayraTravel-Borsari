import ItemCount from "./ItemCount";
import { images } from "../assets/images";
import "../styles/ItemDetail.css";

export default function ItemDetail({ item }) {
  const handleAdd = (quantity) => {
    console.log(`Agregaste ${quantity} unidades de ${item.title}`);
  };
  return (
    <div
      className="detail-hero"
      style={{ backgroundImage: `url(${images[item.image]})` }}
    >
      <div className="detail-overlay" />

      <div className="detail-glass">
        <h2 className="detail-title">{item.title}</h2>
        <p className="detail-short">{item.description}</p>

        <div className="detail-meta">
          <span className="detail-chip">{item.nights} noches</span>
          <span className="detail-chip">USD {item.price}</span>
        </div>

        <ItemCount stock={10} initial={1} onAdd={handleAdd} />
      </div>
    </div>
  );
}
