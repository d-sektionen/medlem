import PropTypes from "prop-types";
import { useContext } from "react";
import { LoadingContext } from "./layout";
import { pixels } from "./layout.module.css";
import Pixels from "./pixels";

const BigPixels = ({ children = undefined }) => {
  const [loading] = useContext(LoadingContext);

  return (
    <>
      <div className={pixels}>
        <Pixels loading={loading.status} />
      </div>
      {children}
    </>
  );
};

BigPixels.propTypes = {
  children: PropTypes.node,
};

export default BigPixels;
