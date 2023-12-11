const MesDemanat = () => {
	return (
		<div className="mes-demanat">
			<div className="mes-demanat-info">
				<h4>El més demanat</h4>
				<h3>ENTREPÀ DE BACON</h3>
				<p>L'entrepà de bacon és l'esmorzar que més ha triomfat l'últim mes.</p>
				<a className="button" href="/producte/6537d85e9d4f4863d3bf6355">
					Reserva ara
				</a>
			</div>
			<img src="images/bacon.png" alt="Més demanat" className="mes-demanat-img" />
		</div>
	);
};

export default MesDemanat;
