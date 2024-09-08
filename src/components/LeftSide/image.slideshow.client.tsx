"use client";
import Image from "next/image";
import { usePageIndex } from "@/utils/route";
import classNames from "classnames";

interface ImageSlideShowProps {
  data?: any[];
  activeIndex?: string;
}

const containerClasses = classNames("flex flex-col h-full");

export default function SlideShow({ data = [] }: ImageSlideShowProps) {
  const activeIndex = usePageIndex();
  if (!data.length) {
    return null;
  }

  const { url, description } = data[activeIndex] || data[0];
  return (
    <div
      id="slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Slideshow"
      aria-live="polite"
      className="relative h-[100%] w-[100%]"
    >
      <figure className={containerClasses}>
        <div className="relative flex-1">
          <Image
            src={url}
            alt={description}
            fill
            priority
            id="slide-image"
            sizes="300px, 300px"
            className="object-contain flex-1"
          />
        </div>
        <figcaption className="p-2 capitalize text-sm truncate">
          {description}
        </figcaption>
      </figure>
    </div>
  );
}
