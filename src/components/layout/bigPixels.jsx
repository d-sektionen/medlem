import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LoadingContext } from "./layout";
import Pixels from "./pixels";
import { pixels } from "../../css/layout.module.css";

const BigPixels = ({ children = undefined }) => {
  const [loading] = useContext(LoadingContext);

  return (
    <>
      <div className={pixels}>
        <Pixels loading={loading.status} />
      </div>
      {children}
      {/* <div className={container}>
        <div className={content}>{children}</div>
      </div> */}
    </>
  );
};

BigPixels.propTypes = {
  children: PropTypes.node,
};

export default BigPixels;
