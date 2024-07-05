"use client";

import styles from "./lower.display.module.css";
import classnames from "classnames";
import Image from "next/image";
import { useState } from "react";
interface ImageSlideShowProps {
  images: Array<{ url: string; caption: string; alt: string }>;
}

export default function LowerDisplay({ images }: ImageSlideShowProps) {
  const { url, caption, alt } = images[0];
  return (
    <div
      id="slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Slideshow"
      aria-live="polite"
    >
      <figure>
        <Image src={url} alt={alt} fill />
        <figcaption>{caption}</figcaption>
      </figure>
    </div>
  );
}
