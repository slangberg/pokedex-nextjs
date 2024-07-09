import styles from "./image.slideshow.module.css";
import Image from "next/image";
interface ImageSlideShowProps {
  data: any[];
  activeIndex: number;
}

export default function SlideShow({ data, activeIndex }: ImageSlideShowProps) {
  const { url, description } = data[activeIndex] || data[0];
  return (
    <div
      id="slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Slideshow"
      aria-live="polite"
      className={styles.container}
    >
      <figure className={styles.container}>
        <Image src={url} alt={description} fill priority />
        <figcaption>{description}</figcaption>
      </figure>
    </div>
  );
}
