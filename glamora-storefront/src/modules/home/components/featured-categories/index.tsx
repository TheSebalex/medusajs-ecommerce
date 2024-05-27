"use client"

import { Heading, Text } from "@medusajs/ui"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Pagination,
  Scrollbar,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"
import "../../../../../node_modules/swiper/swiper.min.css"
import "../../../../../node_modules/swiper/swiper-bundle.css"

export default function FeaturedCategories({
  categories,
}: {
  categories: any[]
}) {
  const colorBackground: string[] = ["#e4deff", "#d8d5ce", "#a296c0", "#f8d2f2"]
  const [displayIndex, setDisplayIndex] = useState(0)
  const [displayIndexAnimate, setDisplayIndexAnimate] = useState(0)

  const getRandomColor = () => {
    return colorBackground[Math.floor(Math.random() * colorBackground.length)]
  }

  const [colors] = useState(categories.map(() => getRandomColor()))

  useEffect(() => {
    setTimeout(() => setDisplayIndexAnimate(displayIndex), 150)
  }, [displayIndex])

  return (
    <>
      <div className="page-width text-center">
        <h2 className="mt-3 mb-5 text-center uppercase tracking-widest">
          Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mx-0 mx-10 page-witdh">
          <Swiper
            modules={[Pagination, Scrollbar, EffectCoverflow, Autoplay]}
            effect={"coverflow"}
            className="md:w-[80%] w-full px-28 [&_>div_.swipe]:aspect-square"
            onSlideChangeTransitionEnd={(swiper) =>
              setDisplayIndex(swiper.realIndex)
            }
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            grabCursor={true}
            pagination={true}
            loop={true}
          >
            {categories.map((category: any, i: number) => {
              return (
                <SwiperSlide key={i} className="relative">
                  <div
                    style={{ backgroundColor: colors[i] }}
                    className={`swipe relative rounded-lg overflow-clip`}
                  >
                    {category.metadata?.image && (
                      <>
                        <Image
                          className="object-cover z-10"
                          alt={`Category ${category.name}`}
                          src={category.metadata?.image || ""}
                          fill
                        />
                      </>
                    )}
                    <div className="z-20 absolute flex flex-col top-0 bottom-0 p-10 left-0 right-0 bg-black/25">
                      <Text className="text-white z-30 text-2xl">
                        {category.name}
                      </Text>
                      <LocalizedClientLink
                        className="m-auto bg-[#2d3142] cursor-pointer [&_.shop-hover]:hover:rotate-45 [&_.shop-hover]:hover:brightness-0 flex gap-1 hover:text-black transition-all hover:bg-white w-fit text-white shadow-lg px-4 rounded py-2"
                        href={`/categories/${category.handle}`}
                      >
                        Visit!
                      </LocalizedClientLink>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {categories.map((category: any, i: number) => {
            return (
              <>
                <div
                  className={`p-5 transition-all flex flex-col ${
                    i === displayIndexAnimate ? "opacity-100" : "opacity-0"
                  } ${i === displayIndex ? "block" : "hidden"}`}
                >
                  <Heading level={"h2"} className="text-2xl mt-auto mb-0">
                    {category.name}
                  </Heading>
                  <Text className="mb-auto mt-10">{category.description}</Text>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
