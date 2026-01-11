import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./components/ItemListContainer"

function App() {

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <ItemListContainer greeting="Bienvenido a Wayra Travel" />
      </div>
    </>
  )
}

export default App
