import { FiEdit, FiTrash2 } from "react-icons/fi";
import useModal from "../modal/useModal";
import { del, patch, post, put } from "../request";
import { Button } from "../ui/buttons";
import { GridItem } from "../ui/grid";
import AddAlbum from "./addAlbum";
import AddPhoto from "./addPhoto";
import { albumActions, photosList } from "./photosAdmin.module.css";

const photoFormData = (data, extra = {}) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries({ ...data, ...extra })) {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }
  return formData;
};

const AlbumPanel = ({ album, mutateAlbums, setAlbum, createAlbum }) => {
  const [openAlbumModal] = useModal(AddAlbum);
  const [openPhotoModal] = useModal(AddPhoto);

  const updateAlbum = async (albumId, data) => {
    const { data: updatedAlbum } = await put(
      `/photos/albums/${albumId}/`,
      data,
    );

    mutateAlbums((current = []) =>
      current.map((a) => (a.id === albumId ? updatedAlbum : a)),
    );
    setAlbum((current) => (current?.id === albumId ? updatedAlbum : current));

    return updatedAlbum;
  };

  const deleteAlbum = async (albumId) => {
    await del(`/photos/albums/${albumId}/`);

    mutateAlbums((current = []) => current.filter((a) => a.id !== albumId), {
      revalidate: false,
    });
    setAlbum((current) => (current?.id === albumId ? null : current));
  };

  const createPhoto = async (data) => {
    const { data: newPhoto } = await post(
      `/photos/photos/`,
      photoFormData(data, { album_id: album.id }),
    );

    mutateAlbums((current = []) =>
      current.map((a) =>
        a.id === album.id ? { ...a, photos: [...a.photos, newPhoto] } : a,
      ),
    );

    return newPhoto;
  };

  const updatePhoto = async (photoId, data) => {
    const { data: updatedPhoto } = await patch(
      `/photos/photos/${photoId}/`,
      photoFormData(data),
    );

    mutateAlbums((current = []) =>
      current.map((a) => ({
        ...a,
        photos: a.photos.map((photo) =>
          photo.id === photoId ? updatedPhoto : photo,
        ),
      })),
    );

    return updatedPhoto;
  };

  const deletePhoto = async (photoId) => {
    await del(`/photos/photos/${photoId}/`);

    const removePhotoFromAlbum = (current) => ({
      ...current,
      photos: current.photos.filter((photo) => photo.id !== photoId),
    });

    mutateAlbums((current = []) => current.map(removePhotoFromAlbum));
  };

  return (
    <>
      <GridItem>
        <h2>Albuminfo</h2>

        <h3>{album.title}</h3>

        <h3>Beskrivning</h3>

        <p>{album.description}</p>

        <div className={albumActions}>
          <Button
            onClick={() =>
              openAlbumModal("Redigera album", {
                album,
                create: createAlbum,
                update: updateAlbum,
              })
            }
          >
            <FiEdit /> Redigera
          </Button>

          <Button onClick={() => deleteAlbum(album.id)}>
            <FiTrash2 /> Radera
          </Button>
        </div>
      </GridItem>
      <GridItem>
        <h2>Foton</h2>

        <ul className={photosList}>
          {album.photos.length === 0 ? (
            <li>Inga foton</li>
          ) : (
            album.photos.map((photo) => (
              <li key={photo.id}>
                <img src={photo.image_url} alt={photo.title} />
                <div>{photo.title}</div>

                <Button
                  onClick={() =>
                    openPhotoModal(`Redigera ${photo.title}`, {
                      create: () => {},
                      update: updatePhoto,
                      photo,
                    })
                  }
                >
                  <FiEdit />
                </Button>

                <Button onClick={() => deletePhoto(photo.id)}>
                  <FiTrash2 />
                </Button>
              </li>
            ))
          )}
        </ul>

        <Button
          onClick={() =>
            openPhotoModal("Nytt foto", {
              create: createPhoto,
            })
          }
        >
          Lägg till foto
        </Button>
      </GridItem>
    </>
  );
};

export default AlbumPanel;
