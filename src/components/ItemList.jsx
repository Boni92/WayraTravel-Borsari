import "../styles/ItemList.css";
import { ItemCard } from "./ItemCard";

export default function ItemList({ items, variant }) {
  const containerClass =
    variant === "home" ? "item-grid item-grid--home" : "item-grid";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} variant={variant} />
      ))}
    </div>
  );
}
