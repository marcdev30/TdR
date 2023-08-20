import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal";

// Components
import CapçaleraComponent from "./components/disseny/CapçaleraComponent";
import PeuComponent from "./components/disseny/PeuComponent";
import PaginaMenu from "./pages/PaginaMenu";
import PaginaContacte from "./pages/PaginaContacte";
import PaginaProducte from "./pages/PaginaProducte";
import PaginaRegistre from "./pages/PaginaRegistre";

function App() {
  return (
    <BrowserRouter>
      <CapçaleraComponent />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/menu" element={<PaginaMenu />} />
        <Route path="/producte" element={<PaginaProducte />} />
        <Route path="/contacte" element={<PaginaContacte />} />
        <Route path="/registre" element={<PaginaRegistre />} />
      </Routes>
      <PeuComponent />
    </BrowserRouter>
  );
}

export default App;
