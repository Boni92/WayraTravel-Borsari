import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import services from "../services";
import "../styles/Checkout.css";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);

  const handleConfirm = async (order) => {
    try {
      setLoading(true);
      setError(null);

      const id = await services.createOrderAndUpdateStock(order);
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error("ERROR createOrder:", err);
      setError(err?.message ?? "No se pudo generar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderId) {
    return (
      <section className="checkout-page">
        <div className="checkout-overlay" />
        <div className="checkout-panel checkout-panel--state">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">
            Tu carrito esta vacio. No hay nada para comprar.
          </p>
          <Link to="/" className="checkout-link checkout-link--ghost">
            Volver al catalogo
          </Link>
        </div>
      </section>
    );
  }

  if (orderId) {
    return (
      <section className="checkout-page">
        <div className="checkout-overlay" />
        <div className="checkout-panel checkout-panel--state">
          <h1 className="checkout-title">Compra confirmada</h1>
          <p className="checkout-subtitle">
            Tu id de orden es: <strong>{orderId}</strong>
          </p>
          <Link to="/" className="checkout-link checkout-link--primary">
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-overlay" />
      <div className="checkout-panel">
        <header className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">
            Completa tus datos para confirmar tu compra
          </p>
        </header>

        {error && <p className="checkout-error">{error}</p>}

        <CheckoutForm onConfirm={handleConfirm} loading={loading} />

        <div className="checkout-back">
          <Link to="/cart" className="checkout-link checkout-link--ghost">
            Volver al carrito
          </Link>
        </div>
      </div>
    </section>
  );
}
