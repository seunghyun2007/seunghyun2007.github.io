'use client'

import { useLightbox } from '@/components/shared/Lightbox'

interface Photo {
  src: string
  alt: string
}

interface Props {
  photos: Photo[]
}

export function PhotoStrip({ photos }: Props) {
  const { open } = useLightbox()

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
      {photos.map(({ src, alt }) => (
        <img
          key={src}
          src={src}
          alt={alt}
          onClick={() => open(src, alt)}
          className="flex-none w-44 h-44 md:w-56 md:h-56 object-cover cursor-zoom-in snap-start hover:opacity-85 transition-opacity"
        />
      ))}
    </div>
  )
}
