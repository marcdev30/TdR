import MesDemanat from "../components/inici/MesDemanat";
import Qualitats from "../components/inici/Qualitats";
import Presentacio from "../components/inici/Presentacio";

const PaginaPrincipal = () => {
	return (
		<>
			<Presentacio />
			<MesDemanat />
			<Qualitats />
		</>
	);
};

export default PaginaPrincipal;
