import React from "react";

import {
  gridContainer,
  gridItem,
  gridFullWidth,
} from "../../css/ui.module.css";

const GridContainer = ({ children }) => (
  <div className={gridContainer}>{children}</div>
);

const GridItem = ({ children, fullWidth = false }) => (
  <div className={`${gridItem} ${fullWidth ? gridFullWidth : ""}`}>
    {children}
  </div>
);

export { GridContainer, GridItem };
