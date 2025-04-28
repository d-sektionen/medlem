import React, { useState } from "react";
import { FaCar, FaTrailer, FaToolbox, FaCamera} from "react-icons/fa";
import { LuLandPlot, LuDrill} from "react-icons/lu";
import { FaTent } from "react-icons/fa6";
import BookableResource from "./bookableResource";
import { container, outerContainer } from "./bookableResourceContainer.module.scss";

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
    <div className={outerContainer}>
      <div className={container}>
        {items?.map((item) => (
          <BookableResource
            key={item.id}
            title={item.name}
            icon={item.icon}
            isSelected={item.id === selectedItem}
            onClick={() => onSelectedItemChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookableResourceContainer;