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
import PaginaPerfil from "./pages/PaginaPerfil";
import PaginaComandes from "./pages/PaginaComandes";

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
				<Route path="/comandes" element={<PaginaComandes />} />
			</Routes>
			<PeuComponent />

			<link href="toastr.css" rel="stylesheet" />
			<script src="toastr.js"></script>
		</BrowserRouter>
	);
}

export default App;
