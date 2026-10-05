import { gridContainer, gridFullWidth, gridItem } from "./ui.module.css";

const GridContainer = ({ children }) => (
  <div className={gridContainer}>{children}</div>
);

const GridItem = ({ children, fullWidth = false }) => (
  <div className={`${gridItem} ${fullWidth ? gridFullWidth : ""}`}>
    {children}
  </div>
);

export { GridContainer, GridItem };
