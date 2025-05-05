import React from "react";
import { container, resourceContainer, label, graphic, selected } from "./bookableResourceContainer.module.scss";

/**
 * BookableResourceContainer component represents a selectable resource
 * 
 * @param {} item - 
 * @param {} selectedItem - 
 * @param {} onSelectedItemChange - 
 * 
 * @description
 * This component 
 */

const BookableResourceContainer = ({items, selectedItem, onSelectedItemChange}) => {

  return (
    <div>
      <div className={container}>
        {items?.map((item) => {
          const containerClasses = `${resourceContainer} ${item.id === selectedItem ? selected : ""}`;
          return (
            <div className={containerClasses} onClick={() => onSelectedItemChange(item.id)} key={item.id}>
              <p className={label}>{item.name}</p>
              <div className={graphic}>{item.icon}</div>
            </div>)
          })}
      </div>
    </div>
  );
}

export default BookableResourceContainer;