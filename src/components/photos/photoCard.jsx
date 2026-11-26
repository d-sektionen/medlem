import { photoCard, photoCardOverlay } from "./photos.module.css";

export const PhotoCard = ({ photo, onClick }) => {
  return (
    <button type="button" className={photoCard} onClick={onClick}>
      <img src={photo.image_url} alt={photo.title} />

      <div className={photoCardOverlay}>
        <h3>{photo.title}</h3>
      </div>
    </button>
  );
};

export default PhotoCard;
