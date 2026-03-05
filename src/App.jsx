import "./App.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import NotFound from "./pages/NotFound";

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import CategoryContainer from "./pages/CategoryContainer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <main key={location.pathname} className="route-fade">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route
            path="/Categorias/:categoriaId"
            element={<CategoryContainer />}
          />
          <Route
            path="/categorias/:categoriaId/:itemId"
            element={<ItemDetailContainer />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
