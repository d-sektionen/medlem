import React from 'react';
import { container } from './alertBanner.module.scss';
import { FaExclamationTriangle } from 'react-icons/fa';

export const AlertBanner = ({ restrictedTimeslot }) => {
  if (!restrictedTimeslot) return null;

  const formatTime = (time) => {
    const options = { month: "long", weekday: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleDateString('sv-SE', options);
  };

  return (
      <div className={container}>
        <FaExclamationTriangle />
        {restrictedTimeslot && (
          <p>{`Bokningar mellan ${formatTime(restrictedTimeslot.start)} och ${formatTime(restrictedTimeslot.end)} behöver godkännas manuellt.`}</p>
        )}
      </div>
  );
};