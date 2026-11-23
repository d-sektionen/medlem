import { useState } from "react";
import FilePicker from "../form/filePicker";
import AutoInput from "../form/input";
import { useCloseModal } from "../modal/useModal";
import { Button } from "../ui/buttons";

const AddPhoto = ({ photo, create, update }) => {
  const isNew = photo === undefined;
  const close = useCloseModal();

  const [title, setTitle] = useState(photo?.title ?? "");
  const [featured, setFeatured] = useState(photo?.featured ?? false);
  const [date, setDate] = useState(
    ((photo && new Date(photo.date)) || new Date()).toISOString().split("T")[0],
  );
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const save = () => {
    const data = { title, featured, date };
    if (!isNew && photo.album?.id) {
      data.album = photo.album.id;
    }
    if (image) {
      data.image = image;
    }
    const request = isNew ? create(data) : update(photo.id, data);

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
        onChange={(e) => setTitle(e)}
      ></AutoInput>
      {errors.title && <div>{errors.title.join(", ")}</div>}

      <AutoInput
        label="Datum"
        type="date"
        value={date}
        required={true}
        onChange={(e) => setDate(e)}
      ></AutoInput>
      {errors.date && <div>{errors.date.join(", ")}</div>}

      <AutoInput
        label="Featured"
        type="boolean"
        value={featured}
        onChange={(e) => setFeatured(e)}
      ></AutoInput>
      {errors.featured && <div>{errors.featured.join(", ")}</div>}

      <FilePicker
        label="Bild"
        value={image}
        onChange={setImage}
        accept="image/*"
        required={isNew}
        existingUrl={photo?.image_url}
        canClear={false}
      />
      {errors.image && <div>{errors.image.join(", ")}</div>}

      {errors.non_field_errors && (
        <div>{errors.non_field_errors.join(", ")}</div>
      )}

      <Button onClick={save}>Submit</Button>
    </div>
  );
};

export default AddPhoto;
