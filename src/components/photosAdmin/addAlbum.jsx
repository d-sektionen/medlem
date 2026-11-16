import { useState } from "react";
import AutoInput from "../form/input";
import { useCloseModal } from "../modal/useModal";
import { Button } from "../ui/buttons";

const AddAlbum = ({ album, create, update }) => {
  const isNew = album === undefined;
  const close = useCloseModal();

  const [title, setTitle] = useState(album?.title ?? "");
  const [description, setDescription] = useState(
    album?.description ?? ""
  );
  const [errors, setErrors] = useState({});

  const save = () => {
    const data = { title, description };
    const request = isNew ? create(data) : update(album.id, data);

    request
      .then(() => {
        close();
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div>
      <AutoInput
        label="Titel"
        type="text"
        value={title}
        required={true}
        onChange={setTitle}
      />
      {errors.title && <div>{errors.title.join(", ")}</div>}

      <AutoInput
        label="Beskrivning"
        type="text"
        value={description}
        onChange={setDescription}
      />
      {errors.description && <div>{errors.description.join(", ")}</div>}

      {errors.non_field_errors && (
        <div>{errors.non_field_errors.join(", ")}</div>
      )}

      <Button onClick={save}>{isNew ? "Skapa" : "Spara"}</Button>
    </div>
  );
};

export default AddAlbum;
