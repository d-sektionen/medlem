import React from "react";
import { container, label, graphic, selected} from "./bookableResource.module.scss";

/**
 * BookableResource component represents a selectable resource with an icon and a label.
 * 
 * @param {string} title - The title of the resource.
 * @param {React.ReactNode} icon - The icon representing the resource.
 * @param {boolean} isSelected - Controls if selected styling should be applied to the component.
 * @param {Function} onClick - The function to call when the resource is clicked.
 * 
 * @description
 * This component scales to fit its container, maintaining an aspect ratio of 1:1.
 * It is designed to be used within a container that manages the selection state.
 */
const BookableResource = ({ title, icon, isSelected, onClick }) => {
  const containerClasses = `${container} ${isSelected ? selected : ""}`;
  return (
    <div className={containerClasses} onClick={onClick}>
      <p className={label}>{title}</p>
      <div className={graphic}>{icon}</div>
    </div>
  );
}

export default BookableResource;