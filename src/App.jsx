import "./App.css"
import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./components/ItemListContainer"

function App() {

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <ItemListContainer 
        greeting="Aún hay mucho por descubrir"
        subtitle="Wayra Travel" 
        description="Explorá el mundo con experiencias diseñadas para vos" />
      </div>
    </>
  )
}

export default App
