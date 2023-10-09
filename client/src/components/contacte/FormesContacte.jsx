import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const FormesContacte = () => (
	<div className="formes-contacte">
		<div className="contacte-capçalera">
			<h2>Contacte</h2>
			<p>
				A continuació li oferim diversos mètodes de contacte en cas de tenir algun
				dubte o problema.
			</p>
		</div>
		<div className="contacte-contingut">
			<div className="forma-contacte">
				<FontAwesomeIcon icon={faEnvelope} />
				<h4>Correu electrònic</h4>
				<p>
					Enviï un correu electrònic a la següent direcció i l'atendrem el més aviat
					possible.
				</p>
				<a href="mailto:iesserrallarga@xtec.cat">iesserrallarga@xtec.cat</a>
			</div>
			<div className="forma-contacte">
				<i class="fa-solid fa-envelope"></i>
				<FontAwesomeIcon icon={faPhone} />
				<h4>Telèfon</h4>
				<p>Truca al següent número per a rebre atenció general de l'institut.</p>
				<a href="tel:+34972331005">972 33 10 05</a>
			</div>
			<div className="forma-contacte">
				<FontAwesomeIcon icon={faLocationDot} />
				<h4>Lloc</h4>
				<p>Estem situats a l'edifici G1 de l'institut Serrallarga de Blanes.</p>
				<a href="https://maps.app.goo.gl/FzWYgfV2KBVAC53o8">
					C/ Joan Benejam, 1 - 17300, Blanes
				</a>
			</div>
		</div>
	</div>
);

export default FormesContacte;
