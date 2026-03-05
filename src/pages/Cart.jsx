import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, removeItem, clearCart, getTotalPrice, getTotalQuantity } =
    useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-overlay" />
        <div className="cart-panel cart-panel--empty">
          <h1 className="cart-title">Carrito</h1>
          <p className="cart-empty-text">Tu carrito esta vacio.</p>
          <Link to="/" className="cart-link cart-link--ghost">
            Volver al catalogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-overlay" />
      <div className="cart-panel">
        <header className="cart-header">
          <h1 className="cart-title">Carrito</h1>
          <p className="cart-subtitle">Revisa tu viaje antes del checkout</p>
        </header>

        <ul className="cart-list">
          {cart.map((prod) => (
            <CartItem key={prod.id} prod={prod} onRemove={removeItem} />
          ))}
        </ul>

        <div className="cart-summary">
          <p>
            Paquetes totales: <strong>{getTotalQuantity()}</strong>
          </p>
          <h3>
            Total: <span>USD {getTotalPrice()}</span>
          </h3>
        </div>

        <div className="cart-actions">
          <button className="cart-btn cart-btn--danger" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/" className="cart-link cart-link--ghost">
            Seguir comprando
          </Link>
          <Link to="/checkout" className="cart-link cart-link--primary">
            Proceder al checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
