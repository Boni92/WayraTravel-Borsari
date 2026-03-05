import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ItemCard.css";
import { images } from "../assets/images";

export function ItemCard({ item, variant }) {
  const imageArray = item.images || [item.image];
  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <article className={variant === "home" ? "card card--home" : "card"}>
      <Link
        to={`/categorias/${item.category}/${item.id}`}
        className="card__link"
      >
        <div
          className="card__imgWrap"
          style={{ backgroundImage: `url(${images[imageArray[currentImg]]})` }}
        >
          <div className="card__body">
            <h3 className="card__title">{item.title}</h3>
            <hr />
            <p className="card__desc">{item.description}</p>

            <div className="card__meta">
              <span>{item.nights} noches</span>
              <span>USD {item.price}</span>
            </div>
          </div>

          {imageArray.length > 1 && (
            <>
              <button
                className="carousel-btn carousel-btn--prev"
                onClick={prevImage}
              >
                ❮
              </button>
              <button
                className="carousel-btn carousel-btn--next"
                onClick={nextImage}
              >
                ❯
              </button>
              <div className="carousel-dots">
                {imageArray.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === currentImg ? "active" : ""}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* ...resto del código... */}
      </Link>
    </article>
  );
}
