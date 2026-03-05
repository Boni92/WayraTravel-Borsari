import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutForm({ onConfirm, loading = false }) {
  const { cart, getTotalPrice } = useCart();

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!buyer.name.trim()) newErrors.name = "Ingresa tu nombre";
    if (!buyer.phone.trim()) newErrors.phone = "Ingresa tu telefono";
    if (!buyer.email.trim()) newErrors.email = "Ingresa tu email";
    if (buyer.email && !buyer.email.includes("@"))
      newErrors.email = "Email invalido";
    if (buyer.confirmEmail !== buyer.email)
      newErrors.confirmEmail = "Los emails no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const order = {
      buyer: {
        name: buyer.name,
        phone: buyer.phone,
        email: buyer.email,
      },
      items: cart.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
      total: getTotalPrice(),
    };

    await onConfirm(order);
  };

  return (
    <div className="checkout-content">
      <section className="checkout-card">
        <h2 className="checkout-card-title">Resumen</h2>
        <ul className="checkout-items">
          {cart.map((p) => (
            <li key={p.id} className="checkout-item-row">
              <span>{p.title}</span>
              <span>
                {p.quantity} x USD {p.price}
              </span>
            </li>
          ))}
        </ul>
        <p className="checkout-total">
          Total: <strong>USD {getTotalPrice()}</strong>
        </p>
      </section>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h2 className="checkout-card-title">Datos de compra</h2>

        <label className="checkout-field" htmlFor="checkout-name">
          Nombre
          <input
            id="checkout-name"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            className="checkout-input"
          />
          {errors.name && <small className="checkout-field-error">{errors.name}</small>}
        </label>

        <label className="checkout-field" htmlFor="checkout-phone">
          Telefono
          <input
            id="checkout-phone"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            className="checkout-input"
          />
          {errors.phone && <small className="checkout-field-error">{errors.phone}</small>}
        </label>

        <label className="checkout-field" htmlFor="checkout-email">
          Email
          <input
            id="checkout-email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            className="checkout-input"
          />
          {errors.email && <small className="checkout-field-error">{errors.email}</small>}
        </label>

        <label className="checkout-field" htmlFor="checkout-confirm-email">
          Confirmar email
          <input
            id="checkout-confirm-email"
            name="confirmEmail"
            value={buyer.confirmEmail}
            onChange={handleChange}
            className="checkout-input"
          />
          {errors.confirmEmail && (
            <small className="checkout-field-error">{errors.confirmEmail}</small>
          )}
        </label>

        <button type="submit" className="checkout-submit" disabled={loading}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
}
