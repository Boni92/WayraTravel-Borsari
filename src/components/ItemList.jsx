import { Link } from "react-router-dom";
import { images } from "../assets/images";
import "../styles/ItemList.css";

export default function ItemList({ items }) {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <li key={item.id} className="item-card">
          <Link
            to={`/categorias/${item.category}/${item.id}`}
            className="item-link"
          >
            <img
              src={images[item.image]}
              alt={item.title}
              className="item-card-img"
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="item-badge">{item.nights} noches</span>
          </Link>
        </li>
      ))}
    </div>
  );
}
