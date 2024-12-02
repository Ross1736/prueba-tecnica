import estilo from "./styles/Buscador.module.css";
import PropTypes from "prop-types";

function Buscador({ cantidad, setTextoBuscar }) {
  function capturarInput(e) {
    setTextoBuscar(e.target.value);
  }

  return (
    <div className={estilo.buscador}>
      <h3>Productos: {cantidad}</h3>
      <input
        type="text"
        placeholder="Buscar producto..."
        onChange={capturarInput}
      />
    </div>
  );
}

Buscador.propTypes = {
  cantidad: PropTypes.number.isRequired,
  setTextoBuscar: PropTypes.func.isRequired,
};

export default Buscador;
