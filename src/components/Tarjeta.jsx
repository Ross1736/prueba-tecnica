import { Link } from "react-router-dom";
import estilo from "./styles/Tarjeta.module.css";
import PropTypes from "prop-types";

function Tarjeta({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`}>
      <div className={estilo.tarjeta}>
        <picture className={estilo.imagen}>
          <img
            src={producto.imgUrl}
            alt={producto.model}
            loading="lazy"
            width={200}
            height={300}
          />
        </picture>

        <div className={estilo.textos}>
          <p>{producto.brand}</p>
          <h2>{producto.model}</h2>
          <p>${Number(producto.price).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

Tarjeta.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tarjeta;
