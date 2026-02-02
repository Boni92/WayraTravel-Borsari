import { Menu } from "./Menu";
import { CartWidget } from "./CartWidget";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo Wayra Travel" className="navbar-logo" />
      </Link>
      <ul className="navbar-links">
        <Menu label="Playa" to="/categorias/playa" />
        <Menu label="Montañas" to="/categorias/montañas" />
        <Menu label="Ciudades" to="/categorias/ciudades" />
      </ul>

      <CartWidget />
    </nav>
  );
}
