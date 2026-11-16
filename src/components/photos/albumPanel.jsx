import useSWR from "swr";
import PhotoCard from "./photoCard";
import {
  photoGrid,
  albumPanel,
  large as largeClass,
} from "./photos.module.css";
import { useMemo } from "react";

const AlbumPanel = ({ albumId, onPhotoClick }) => {
  const { data: album } = useSWR(`/photos/albums/${albumId}/`);

  const featuredPhotos = useMemo(() => {
    if (!album) return [];
    return album.photos.filter((photo) => photo.featured);
  }, [album]);

  const nonFeaturedPhotos = useMemo(() => {
    if (!album) return [];
    return album.photos.filter((photo) => !photo.featured);
  }, [album]);

  return (
    <div className={albumPanel}>
      {album ? (
        <>
          <h1>{album.title}</h1>

          <p>{album.description}</p>

          {featuredPhotos.length > 0 && (
            <>
              <h2>Utvalda foton</h2>

              <PhotoList
                photos={featuredPhotos}
                onPhotoClick={onPhotoClick}
                large={true}
              />

              <hr></hr>
            </>
          )}

          {nonFeaturedPhotos.length > 0 && (
            <PhotoList photos={nonFeaturedPhotos} onPhotoClick={onPhotoClick} />
          )}

          {nonFeaturedPhotos.length === 0 && featuredPhotos.length === 0 && (
            <p>Det finns inga foton i detta album.</p>
          )}
        </>
      ) : (
        <p>Laddar album...</p>
      )}
    </div>
  );
};

const PhotoList = ({ photos, onPhotoClick, large = false }) => {
  return (
    <div className={`${photoGrid} ${large ? largeClass : ""}`}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
};

export default AlbumPanel;
