import { HeroHome } from "../components/HeroHome";
import { ItemListContainer } from "../components/ItemListContainer";

export default function Home() {
  return (
    <div>
      <HeroHome
        greeting="Aún hay mucho por descubrir"
        subtitle="Wayra Travel"
        description="Explorá el mundo con experiencias diseñadas para vos"
      />
      <ItemListContainer />
    </div>
  );
}
