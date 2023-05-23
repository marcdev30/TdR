import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal";

// Components
import CapçaleraComponent from "./components/CapçaleraComponent";
import PeuComponent from "./components/PeuComponent";

function App() {
	return (
		<BrowserRouter>
			<CapçaleraComponent />
			<Routes>
				<Route path="/" element={<PaginaPrincipal />} />
			</Routes>
			<PeuComponent />
		</BrowserRouter>
	);
}

export default App;
