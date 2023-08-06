const CategoriaProducte = ({ imatge, nom }) => {
	return (
		<div className="categoria">
			<img src={imatge} alt="Imatge de la categoria" />
			<hr />
			<p className="categoria-nom">{nom}</p>
		</div>
	);
};

export default CategoriaProducte;
