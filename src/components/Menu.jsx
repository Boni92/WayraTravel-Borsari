import { Link } from "react-router-dom";

export function Menu({ label, to }) {
  return (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}
