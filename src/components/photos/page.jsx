import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import AlbumPanel from "./albumPanel";
import PhotoModal from "./photoModal";

const PhotosPage = () => {
  const { title } = usePageContext();

  const [album, setAlbum] = useState(null);
  const { data: albums } = useSWR("/photos/albums/");

  const [photo, setPhoto] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const albumId = searchParams.get("album");

    let foundAlbum;
    let foundPhoto;

    if (albumId && albums) {
      foundAlbum = albums.find((album) => album.id === parseInt(albumId, 10));
      if (foundAlbum) {
        setAlbum(foundAlbum);
      }
    }

    const photoId = searchParams.get("photo");

    if (photoId && album) {
      foundPhoto = album.photos.find(
        (photo) => photo.id === parseInt(photoId, 10),
      );
      if (foundPhoto) {
        setPhoto(foundPhoto);
        setIsPhotoModalOpen(true);
      }
    }

    if (foundAlbum || foundPhoto) {
      setSearchParams(
        (prevParams) => {
          const newParams = new URLSearchParams(prevParams);
          if (foundAlbum) newParams.delete("album");
          if (foundPhoto) newParams.delete("photo");
          return newParams;
        },
        {
          replace: true,
        },
      );
    }
  }, [searchParams, setSearchParams, album, albums]);

  const handlePhotoClick = (photo) => {
    setPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const getRelativePhoto = (direction) => {
    if (!album || !photo) return null;

    const currentIndex = album.photos.findIndex((p) => p.id === photo.id);
    if (currentIndex === -1) return null;

    const nextIndex =
      (currentIndex + direction + album.photos.length) % album.photos.length;
    return album.photos[nextIndex];
  };

  const handleNextPhoto = () => {
    const nextPhoto = getRelativePhoto(1);
    if (nextPhoto) {
      setPhoto(nextPhoto);
    }
  };

  const handlePreviousPhoto = () => {
    const previousPhoto = getRelativePhoto(-1);
    if (previousPhoto) {
      setPhoto(previousPhoto);
    }
  };

  return (
    <>
      <BigPixels>
        <GridContainer>
          <GridItem fullWidth>
            <TitleChooser
              title={title}
              choice={album}
              setChoice={setAlbum}
              choices={albums ?? []}
              label="title"
              hintLabel="Välj ett album"
            />
          </GridItem>
          {album && (
            <GridItem fullWidth={true}>
              <AlbumPanel albumId={album.id} onPhotoClick={handlePhotoClick} />
            </GridItem>
          )}
        </GridContainer>
      </BigPixels>

      <PhotoModal
        isOpen={isPhotoModalOpen}
        setOpen={setIsPhotoModalOpen}
        photo={photo}
        onNext={handleNextPhoto}
        onPrevious={handlePreviousPhoto}
      />
    </>
  );
};

export default PhotosPage;
