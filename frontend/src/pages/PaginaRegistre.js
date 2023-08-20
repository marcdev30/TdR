import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const PaginaRegistre = () => {
  return (
    <div className="registre">
      <div
        className="registre-formulari"
      >
        <h3>Com et dius?</h3>
        <div>
          <TextField variant="standard">Hola</TextField>
          <IconButton color="primary">
            <ArrowCircleRightIcon />
          </IconButton>
        </div>
      </div>
      <img
        src="/images/fons-registre.svg"
        alt=""
        
      />
    </div>
  );
};

export default PaginaRegistre;
