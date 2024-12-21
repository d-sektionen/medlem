import React from 'react';
import { container } from './alertBanner.module.scss';
import { FaExclamationTriangle } from 'react-icons/fa';

export const AlertBanner = ({ message }) => {
  return (
      <div className={container}>
        <FaExclamationTriangle />
        <p>{message}</p>
      </div>
  );
};