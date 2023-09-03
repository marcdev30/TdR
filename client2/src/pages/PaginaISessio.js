import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useRef, useState } from "react";

const PaginaISessio = () => {
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
    <div className="i-sessio">
      <img src="/images/fons-registre.svg" alt="" />
      <div className="isessio-formulari">
        <div className="isessio-pas">
          <h3>Inicia la sessió</h3>
          <div className="d-flex flex-column mt-4">
            <TextField
              variant="standard"
              className="me-3"
              placeholder="Correu del centre"
            />
            <TextField
              variant="standard"
              className="me-3"
              placeholder="Contrasenya"
            />
            <IconButton color="primary">
              <ArrowCircleRightIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaISessio;
