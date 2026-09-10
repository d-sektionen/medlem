import PropTypes from "prop-types";
import React, { useContext } from "react";
import { pixels } from "../../scss/layout.module.scss";
import { LoadingContext } from "./layout";
import Pixels from "./pixels";

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
