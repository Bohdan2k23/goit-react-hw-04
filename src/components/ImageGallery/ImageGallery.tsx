import css from './ImageGallery.module.css';
import type { ImageData } from "../../lib/types"

type ImageCardProps = {
  picture: ImageData
  onClick: (src: string) => void
}


function ImageCard({ picture, onClick }: ImageCardProps) {
  return (
    <div>
      <div className={css.imgCardContainer}>
        <img
          onClick={() => onClick(picture.urls.regular)}
          className={css.imgItem}
          width={300}
          src={picture.urls.small}
          alt={picture.alt_description}
        />
      </div>
    </div>
  );
};


type ImageGalleryProps = {
  pictures: ImageData[]
  onClick: (src: string) => void
}
export default function ImageGallery({ pictures, onClick }: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {pictures !== null &&
        Array.isArray(pictures) &&
        pictures.map(picture => {
          return (
            <li className={css.itemsGallery} key={picture.id}>
              <ImageCard picture={picture} onClick={onClick} />
            </li>
          );
        })}
    </ul>
  );
};
