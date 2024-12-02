import PropTypes from "prop-types";
import { GeneralProvider, CarritoProvider } from "./Proveedores";

const ContextProvider = ({ children }) => {
  return (
    <GeneralProvider>
      <CarritoProvider>{children}</CarritoProvider>
    </GeneralProvider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
