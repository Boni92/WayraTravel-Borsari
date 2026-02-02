import "./App.css";
import { NavBar } from "./components/NavBar";
import NotFound from "./pages/NotFound";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import CategoryContainer from "./pages/CategoryContainer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Categorias/:categoriaId"
          element={<CategoryContainer />}
        />
        <Route
          path="/categorias/:categoriaId/:itemId"
          element={<ItemDetailContainer />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
