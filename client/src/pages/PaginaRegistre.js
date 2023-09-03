import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useRef, useState } from "react";

const PaginaRegistre = () => {
  const [registrePas, setRegistrePas] = useState(0);
  const registreForm = useRef(null);
  const [formData, setFormData] = useState({
    nom: "",
    correu: "",
    contrasenya: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // You can use formData to build the data object to be submitted.
    const data = {
      nom: formData.nom,
      correu: formData.correu,
      contrasenya: formData.contrasenya,
    };

    // Submit the data using a hidden form element
    const form = document.createElement("form");
    form.action = "/"; // Specify your form action here
    form.method = "POST"; // Use the appropriate HTTP method
    form.style.display = "none";

    // Create hidden input elements for each data field
    for (const key in data) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }

    // Append the form to the document body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="registre">
      <div className="registre-formulari">
        {registrePas === 0 ? (
          <div className="registre-pas primer-pas">
            <h3>Com et dius?</h3>
            <div className="d-flex mt-4">
              <TextField variant="standard" className="me-3" />
              <IconButton color="primary" onClick={() => setRegistrePas(1)}>
                <ArrowCircleRightIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
        ) : (
          <></>
        )}
        {registrePas === 1 ? (
          <div className="registre-pas segon-pas">
            <h3>Quin és el teu correu?</h3>
            <div className="d-flex mt-4">
              <TextField
                name="correu"
                variant="standard"
                className="me-3"
                value={formData.correu}
                onChange={handleInputChange}
              />
              <IconButton color="primary" onClick={() => setRegistrePas(2)}>
                <ArrowCircleRightIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
        ) : (
          <></>
        )}
        {registrePas === 2 ? (
          <div className="registre-pas tercer-pas">
            <h3>Escriu una contrasenya</h3>
            <div className="d-flex mt-4">
              <TextField variant="standard" className="me-3" />
              <IconButton color="primary" onClick={() => handleSubmit()}>
                <ArrowCircleRightIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* </form> */}
      <img src="/images/fons-registre.svg" alt="" />
    </div>
  );
};

export default PaginaRegistre;
