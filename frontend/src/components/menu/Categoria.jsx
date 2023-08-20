const Categoria = ({ imatge, nom, setCategoriaSeleccionada }) => {
  return (
    <div onClick={() => setCategoriaSeleccionada(nom)} className="categoria">
      <img src={imatge} alt="Imatge de la categoria" />
      <hr />
      <p className="categoria-nom">{nom}</p>
    </div>
  );
};

export default Categoria;
