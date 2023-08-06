import CategoriaProducte from "./CategoriaProducte";

const QuadriculaCategories = () => {
	return (
		<div className="quadricula">
			{[...Array(6)].map(categoria => (
				<CategoriaProducte
					imatge={
						"https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
					}
					nom={"Entrepans"}
				/>
			))}
		</div>
	);
};

export default QuadriculaCategories;
