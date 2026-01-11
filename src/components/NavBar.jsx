import { Menu } from "./Menu"
import { CartWidget } from "./CartWidget"
import logo from "../assets/logo.svg"

export function NavBar() {
    return (
        <nav className="navbar">
                <img src={logo} alt="Logo Wayra Travel"  className="navbar-logo"/>

                <ul className="navbar-links">
                    <Menu destino="Destinos" />
                    <Menu destino="Nosotros" />
                    <Menu destino="Contacto" />
                </ul>

                <CartWidget />
        </nav>
    )
}