import { Text } from "@medusajs/ui"
import { ArrowUpRightMini } from "@medusajs/icons"
import herobg from "../../../../../public/cute-girl-with-beautiful-face.jpg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[85vh] min-h-[600px] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div
        style={{ backgroundImage: `url(${herobg.src})` }}
        className="hero-background absolute inset-0 z-10 flex flex-col justify-center items-center text-center md:p-32 gap-6"
      >
        <div className="w-[85%] md:w-[50%] mx-auto text-center md:text-left md:mr-auto md:ml-0">
          <Text className="text-2xl leading-10 md:text-left font-normal text-white mb-5">
            Explore our exclusive selection of cosmetics to discover products
            that enhance your natural beauty and boost your confidence.
          </Text>
          <LocalizedClientLink
            href="/store"
            className={
              "bg-[#2d3142] cursor-pointer [&_.shop-hover]:hover:rotate-45 [&_.shop-hover]:hover:brightness-0 flex gap-1 hover:text-black transition-all hover:bg-white w-fit text-white mx-auto md:mx-0 shadow-md px-3 rounded py-1"
            }
          >
            Shop now!
            <ArrowUpRightMini
              className="ml-auto mr-0 shop-hover transition-all"
              color="white"
            />
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
