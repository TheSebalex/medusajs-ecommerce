"use client"

import { useRef, useState } from "react"
import { Image as MedusaImage } from "@medusajs/medusa"
import { ClockSolid } from "@medusajs/icons"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

// key={image.id}
// className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
// id={image.id}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imgRef: any = useRef(null)

  return (
    <div className="">
      <div className="max-w-[100%] relative aspect-square rounded-lg overflow-clip">
        <Image
          alt="Selected Product Image"
          onLoad={() => setLoading(false)}
          src={images[activeImage]?.url ?? ""}
          fill
          ref={imgRef}
          quality={90}
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          className="bottom-0 left-0 top-0 right-0 w-full aspect-square object-cover"
        />
        {loading && (
          <div className="absolute backdrop-blur-lg flex bg-black/40 top-0 left-0 bottom-0 right-0">
            <ClockSolid className="text-white m-auto" />
          </div>
        )}
      </div>
      <div className="flex m-auto relative h-[100px] overflow-x-auto w-full aspect-square py-2 gap-4">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              onClick={() => {
                setTimeout(
                  () => (!imgRef.current?.complete ?? true) && setLoading(true),
                  200
                )
                setActiveImage(index)
              }}
              className={`${
                index === activeImage
                  ? "border-ui-interactive"
                  : "border-transparent"
              } border-2 relative h-full w-auto min-w-[100px] hover:brightness-75 aspect-square rounded-md m-0 cursor-pointer shadow overflow-auto transition-all`}
            >
              <Image
                src={image.url}
                fill
                alt={`Product image ${index + 1}`}
                className="object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
