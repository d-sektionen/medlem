import { useState } from "react";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { post } from "../request";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import AlbumPanel from "./albumPanel";
import useModal from "../modal/useModal";
import AddAlbum from "./addAlbum";

const PhotosAdminPage = () => {
  const { title } = usePageContext();

  const [album, setAlbum] = useState(null);
  const { data: albums, mutate: mutateAlbums } = useSWR("/photos/albums/");

  const [openAlbumModal] = useModal(AddAlbum);

  const createAlbum = async (data) => {
    const { data: newAlbum } = await post("/photos/albums/", data);
    mutateAlbums((current = []) => [...current, newAlbum]);
    setAlbum(newAlbum);

    return newAlbum;
  };

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
            action={() => {
              openAlbumModal("Nytt album", {
                create: createAlbum,
              });
            }}
            actionLabel="Nytt album"
            noChoicesLabel="Det finns inga album just nu."
          />
        </GridItem>
        {album && (
          <AlbumPanel
            album={album}
            mutateAlbums={mutateAlbums}
            setAlbum={setAlbum}
            createAlbum={createAlbum}
          />
        )}
      </GridContainer>
    </BigPixels>
  );
};

export default PhotosAdminPage;
