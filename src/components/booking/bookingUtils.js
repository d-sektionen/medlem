/**
 *  BookingsUtil 
 * 
 * @param {} dateString - 
 * @param {} hourString - 
 * 
 * @description
 * This component 
 */

export const formatDate = (dateString, hourString) => {
  return new Date(`${dateString}T${hourString}`);
}