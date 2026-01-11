import heroImage from '../assets/hero.webp'

export function ItemListContainer(props) {
    return (
        <section className="hero" style={{backgroundImage: `url(${heroImage})`}}>
            
            <div className='hero-overlay'>
                <h2>{props.subtitle}</h2>
                <h1>{props.greeting}</h1>

                <p>{props.description}</p>

                <button className='hero-btn'>Descubrir detinos</button>
            </div>

        </section>
    )
}