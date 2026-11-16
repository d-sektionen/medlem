import { useEffect, useMemo } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiShare2,
} from "react-icons/fi";
import Modal from "../modal/modal";
import { Button } from "../ui/buttons";
import {
  photoModalContent,
  photoModalControls,
  photoModalDetails,
} from "./photos.module.css";

const PhotoModal = ({ photo, isOpen, setOpen, onNext, onPrevious }) => {
  const details = useMemo(() => {
    const uploaded = photo?.date
      ? new Date(photo.date).toLocaleDateString()
      : null;
    const user = photo?.user ? photo.user.pretty_name : null;

    if (!uploaded && !user) return null;

    let string = "Uppladdat ";
    if (uploaded) string += `${uploaded} `;
    if (user) string += `av ${user}`;

    return string;
  }, [photo]);

  const tags = useMemo(() => {
    const tags = photo?.tags ?? [];
    if (tags.length === 0) return null;

    return tags.map((tag) => tag.name).join(", ");
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onNext, onPrevious]);

  const onCopyClick = () => {
    if (!photo) return;

    const url = new URL(window.location);
    url.searchParams.set("photo", photo.id);
    url.searchParams.set("album", photo.album.id);
    navigator.clipboard.writeText(url.toString());
  };

  return (
    <Modal
      title={photo?.title ?? "Ingen titel"}
      isOpen={isOpen}
      setOpen={setOpen}
      options={{ floating: true }}
    >
      <div className={photoModalContent}>
        <div>
          <Button onClick={onPrevious}>
            <FiChevronLeft />
          </Button>
        </div>

        <img src={photo?.image_url} alt={photo?.title} />

        <div>
          <Button onClick={onNext}>
            <FiChevronRight />
          </Button>
        </div>

        <div className={photoModalControls}>
          <Button href={photo?.image_url} download>
            <FiDownload />
          </Button>
          <Button onClick={onCopyClick}>
            <FiShare2 />
          </Button>
        </div>

        <p className={photoModalDetails}>
          {details}
          <br></br>
          {tags && tags.length > 0 ? `Taggar: ${tags}` : "Inga taggar"}
        </p>
      </div>
    </Modal>
  );
};

export default PhotoModal;
