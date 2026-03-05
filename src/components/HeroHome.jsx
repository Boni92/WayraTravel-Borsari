import heroImage from "../assets/hero2.webp";

export function HeroHome(props) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <h2>{props.subtitle}</h2>
        <h1>{props.greeting}</h1>

        <p>{props.description}</p>

        <a href="#playa" className="hero-btn">
          Descubrir destinos
        </a>
      </div>
    </section>
  );
}
