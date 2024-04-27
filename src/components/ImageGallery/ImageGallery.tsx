import css from './ImageGallery.module.css';
import type { ImageData } from "../../lib/types"
import { ImageCard } from '../ImageCard/ImageCard';


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
