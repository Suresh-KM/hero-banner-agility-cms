"use client";
import { useState } from "react";
import { AgilityPic, ImageField } from "@agility/nextjs";

interface GalleryImage extends ImageField {
  mediaID: number;
  url: string;
  fileName: string;
  size: number;
  modifiedOn: string;
  metaData: {
    pixelHeight: string;
    pixelWidth: string;
  };
}

export default function HeroBannerGallery({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="aspect-square rounded-full overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center">
        <AgilityPic
          image={images[current]}
          className="absolute inset-0 w-full h-full object-cover"
          fallbackWidth={800}
          priority={current === 0}
          sources={[
            { media: "(min-width: 768px)", width: 400 },
            { media: "(max-width: 767px)", width: 400 },
          ]}
        />
      </div>
      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === current ? "bg-primary-500" : "bg-gray-400/60"}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to image ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
