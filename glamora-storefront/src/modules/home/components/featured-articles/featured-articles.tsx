"use client"

import ListBlogItem from "@modules/blog/components/list-blog-item"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import "../../../../../node_modules/swiper/swiper.min.css"
import "../../../../../node_modules/swiper/swiper-bundle.css"
import { MutableRefObject, useRef, useState } from "react"

export default function FeaturedArticles({ articles }: { articles: any[] }) {
  const swiper: MutableRefObject<any> = useRef(null)
  const [numberItem, setNumberItem] = useState(1)

  return (
    <>
      <div className="page-width">
        <h2 className="mt-3 mb-5 uppercase tracking-widest text-center">
          Featured Guides
        </h2>
        <div className="flex gap-5 md:mx-0 mx-5 page-witdh">
          <button onClick={() => swiper.current?.slidePrev()}>
            <ChevronLeft />
          </button>
          <Swiper
            onAfterInit={(swp) => (swiper.current = swp)}
            modules={[Autoplay]}
            effect={"slide"}
            coverflowEffect={{
              slideShadows: false,
              depth: 50,
            }}
            onSlideChangeTransitionEnd={() =>
              setNumberItem(swiper.current?.realIndex + 1)
            }
            className="md:w-[80%] w-full px-28 flex-grow"
            autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
            loop={true}
          >
            {articles.map((article: any, i: number) => {
              return (
                <SwiperSlide
                  style={{ display: "flex" }}
                  key={i}
                  className="p-2 lg:p-10"
                >
                  <ListBlogItem
                    key={article.handle}
                    title={article.title}
                    content={article.content}
                    handle={article.handle}
                    image={
                      article.metadata?.find((m: any) => m.key === "image")
                        ?.content
                    }
                    pub_date={article.pub_date}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <button onClick={() => swiper.current?.slideNext()}>
            <ChevronRight />
          </button>
        </div>
        <div className="flex justify-center mt-4 gap-1">
          {new Array(articles.length).fill(0).map((_, i) => (
            <div
              onClick={() => swiper.current?.slideTo(i)}
              key={i}
              className="p-2 cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  numberItem === i + 1 ? "bg-[#a296c0]" : "bg-[#f8d2f2]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
