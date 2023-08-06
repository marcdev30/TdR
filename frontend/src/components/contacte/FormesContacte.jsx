import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const FormesContacte = () => (
  <div className="formes-contacte">
    <div className="contacte-capçalera">
      <h2>Contacte</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div className="contacte-contingut">
      <div className="forma-contacte">
        <FontAwesomeIcon icon={faEnvelope} />
        <h4>Correu electrònic</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in ero.
        </p>
        <a href="mailto:insserrallarga@gmail.cat">insserrallarga@gmail.cat</a>
      </div>
      <div className="forma-contacte">
        <i class="fa-solid fa-envelope"></i>
        <FontAwesomeIcon icon={faPhone} />
        <h4>Telèfon</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in ero.
        </p>
        <a href="mailto:insserrallarga@gmail.cat">insserrallarga@gmail.cat</a>
      </div>
      <div className="forma-contacte">
        <FontAwesomeIcon icon={faLocationDot} />
        <h4>Lloc</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in ero.
        </p>
        <a href="mailto:insserrallarga@gmail.cat">insserrallarga@gmail.cat</a>
      </div>
    </div>
  </div>
);

export default FormesContacte;
