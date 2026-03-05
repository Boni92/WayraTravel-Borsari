import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CartWidget.css";

export function CartWidget() {
  const { getTotalQuantity } = useCart();
  const total = getTotalQuantity();

  return (
    <Link to="/cart" className="cart-widget">
      🛒
      {total > 0 && <span className="cart-badge">{total}</span>}
    </Link>
  );
}
