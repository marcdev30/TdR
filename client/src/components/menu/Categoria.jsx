const Categoria = ({ imatge, nom, setCategoriaSeleccionada, index, fons }) => {
	return (
		<div
			onClick={() => setCategoriaSeleccionada(index + 1)}
			className={`categoria ${fons ? "categoria-fons" : ""}`}
		>
			<img src={imatge} alt="Imatge de la categoria" />
			<hr />
			<p className="categoria-nom">{nom}</p>
		</div>
	);
};

export default Categoria;
