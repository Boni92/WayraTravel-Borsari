import { Link } from "react-router-dom";
import "../styles/Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <h3>Wayra Travel</h3>
          <p>Viajes listos para la playa, montañas y ciudades.</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/">Inicio</Link>
          <Link to="/categorias/playa">Playa</Link>
          <Link to="/categorias/montañas">Montanas</Link>
          <Link to="/categorias/ciudades">Ciudades</Link>
        </nav>

        <div className="site-footer__contact">
          <p>hola@wayratravel.com</p>
          <p>+54 11 0000 0000</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <small>
          &copy; {new Date().getFullYear()} Wayra Travel. Todos los derechos
          reservados.
        </small>
      </div>
    </footer>
  );
}
