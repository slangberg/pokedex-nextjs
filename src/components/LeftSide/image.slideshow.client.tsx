"use client";

import { usePathname, useSearchParams } from "next/navigation";
import styles from "./image.slideshow.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePageIndex } from "@/utils/route";
interface ImageSlideShowProps {
  data?: any[];
  activeIndex?: string;
}

export default function SlideShow({ data = [] }: ImageSlideShowProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
      className={styles.container}
    >
      <figure className={styles.container}>
        <Image src={url} alt={description} fill priority />
        <figcaption>{description}</figcaption>
      </figure>
    </div>
  );
}
