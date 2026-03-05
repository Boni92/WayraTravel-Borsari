export default function CartItem({ prod, onRemove }) {
  const subtotal = prod.price * prod.quantity;

  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <strong className="cart-item__title">{prod.title}</strong>
        <span className="cart-item__meta">
          USD {prod.price} x {prod.quantity} = <strong>USD {subtotal}</strong>
        </span>
      </div>

      <button className="cart-item__remove" onClick={() => onRemove(prod.id)}>
        Eliminar
      </button>
    </li>
  );
}
