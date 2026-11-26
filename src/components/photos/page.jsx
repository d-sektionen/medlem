import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import AlbumPanel from "./albumPanel";

const PhotosPage = () => {
  const { title } = usePageContext();

  const [album, setAlbum] = useState(null);
  const { data: albums } = useSWR("/photos/albums/");

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

  return (
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
            <AlbumPanel album={album} />
          </GridItem>
        )}
      </GridContainer>
    </BigPixels>
  );
};

export default PhotosPage;
