import { useState } from "react";
import "../styles/ItemCount.css";

export default function ItemCount(props) {
  const stock = props.stock ?? 10;
  const initial = props.initial ?? 1;
  const [count, setCount] = useState(initial);

  const increase = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddClick = () => {
    props.onAdd(count);
  };

  return (
    <div className="item-count-glass">
      <div className="item-count-controls">
        <button className="count-btn-glass" onClick={decrease}>
          -
        </button>
        <span className="count-value-glass">{count}</span>
        <button className="count-btn-glass" onClick={increase}>
          +
        </button>
      </div>
      <button className="add-to-cart-glass" onClick={handleAddClick}>
        Agregar a mi viaje
      </button>
    </div>
  );
}
