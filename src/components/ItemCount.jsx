import { useState } from "react";
import "../styles/ItemCount.css";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddClick = () => {
    if (stock > 0 && count >= 1) onAdd(count);
  };

  if (stock === 0) {
    return <p>Producto sin stock</p>;
  }

  return (
    <div className="item-count-glass">
      <div className="item-count-controls">
        <button
          className="count-btn-glass"
          onClick={decrement}
          disabled={count <= 1}
        >
          -
        </button>
        <span className="count-value-glass">{count}</span>
        <button className="count-btn-glass" onClick={increment}>
          +
        </button>
      </div>
      <button className="add-to-cart-glass" onClick={handleAddClick}>
        Agregar a mi viaje
      </button>

      <p className="itemcount-stock">
        Stock disponible: <span>{stock}</span>
      </p>
    </div>
  );
}
