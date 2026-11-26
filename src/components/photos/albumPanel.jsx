import { useMemo } from "react";
import useSWR from "swr";
import useModal from "../modal/useModal";
import PhotoCard from "./photoCard";
import PhotoModal from "./photoModal";
import {
  albumPanel,
  large as largeClass,
  photoGrid,
} from "./photos.module.css";

const AlbumPanel = ({ album }) => {
  const { data: photos } = useSWR(`/photos/photos/?album=${album.id}`);

  const [openPhotoModal] = useModal(PhotoModal);

  const featuredPhotos = useMemo(() => {
    if (!photos) return [];
    return photos.filter((photo) => photo.featured);
  }, [photos]);

  const nonFeaturedPhotos = useMemo(() => {
    if (!photos) return [];
    return photos.filter((photo) => !photo.featured);
  }, [photos]);

  const showPhotoModal = (photo) => {
    openPhotoModal(
      photo.title,
      {
        photo,
        onNext: () => showRelativePhoto(photo, 1),
        onPrevious: () => showRelativePhoto(photo, -1),
      },
      { floating: true },
    );
  };

  const showRelativePhoto = (photo, direction) => {
    if (!photos) return;

    const currentIndex = photos.findIndex((p) => p.id === photo.id);
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + direction + photos.length) % photos.length;
    showPhotoModal(photos[nextIndex]);
  };

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
                onPhotoClick={showPhotoModal}
                large={true}
              />

              <hr></hr>
            </>
          )}

          {nonFeaturedPhotos.length > 0 && (
            <PhotoList
              photos={nonFeaturedPhotos}
              onPhotoClick={showPhotoModal}
            />
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
