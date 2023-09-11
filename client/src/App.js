import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal";

// Components
import CapçaleraComponent from "./components/disseny/CapçaleraComponent";
import PeuComponent from "./components/disseny/PeuComponent";
import PaginaMenu from "./pages/PaginaMenu";
import PaginaContacte from "./pages/PaginaContacte";
import PaginaProducte from "./pages/PaginaProducte";
import PaginaRegistre from "./pages/PaginaRegistre";
import PaginaISessio from "./pages/PaginaISessio";
import PaginaDetallsProducte from "./pages/PaginaDetallsProducte";
import PaginaPerfil from "./pages/PaginaPerfil";

function App() {
	return (
		<BrowserRouter>
			<CapçaleraComponent />
			<Routes>
				<Route path="/" element={<PaginaPrincipal />} />
				<Route path="/menu" element={<PaginaMenu />} />
				<Route path="/producte/:producteId" element={<PaginaProducte />} />
				<Route path="/contacte" element={<PaginaContacte />} />
				<Route path="/registre" element={<PaginaRegistre />} />
				<Route path="/inici-sessio" element={<PaginaISessio />} />
				<Route path="/perfil" element={<PaginaPerfil />} />
			</Routes>
			<PeuComponent />
		</BrowserRouter>
	);
}

export default App;
