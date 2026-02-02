import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="nf-hero">
      <div className="nf-overlay" />

      <div className="nf-glass">
        <h1 className="nf-title">404</h1>
        <p className="nf-subtitle">Ups… esta ruta no existe</p>
        <p className="nf-text">
          Puede que el enlace esté mal escrito o que la página se haya movido.
        </p>

        <div className="nf-actions">
          <Link className="nf-btn nf-btn-primary" to="/">
            Volver al Home
          </Link>
        </div>
      </div>
    </div>
  );
}
