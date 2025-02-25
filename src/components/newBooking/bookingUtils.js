export const formatDate = (dateString, hourString) => {
  return new Date(`${dateString}T${hourString}`);
}