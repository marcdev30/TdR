import MesDemanat from "../components/inici/MesDemanat";
import Qualitats from "../components/inici/Qualitats";
import Presentacio from "../components/inici/Presentacio";
import { useEffect, useState } from "react";
import axios from "axios";

const PaginaPrincipal = () => {
	return (
		<>
			<Presentacio />
			<MesDemanat />
			{/* <Qualitats /> */}
		</>
	);
};

export default PaginaPrincipal;
