import ItemCount from "./ItemCount";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { images } from "../assets/images";
import "../styles/ItemDetail.css";

export default function ItemDetail({ item }) {
  const { addItem, getItemQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const alreadyInCart = getItemQuantity(item.id);
  const availableStock = Math.max((item.stock ?? 0) - alreadyInCart, 0);

  const handleAdd = (quantity) => {
    addItem(
      {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
      },
      quantity,
    );
    setAdded(true);
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
        {!added ? (
          availableStock > 0 ? (
            <ItemCount stock={availableStock} initial={1} onAdd={handleAdd} />
          ) : (
            <p style={{ marginTop: 12 }}>Producto sin stock disponible</p>
          )
        ) : (
          <Link to="/cart" className="go-to-cart">
            Ir al carrito
          </Link>
        )}
      </div>
    </div>
  );
}
