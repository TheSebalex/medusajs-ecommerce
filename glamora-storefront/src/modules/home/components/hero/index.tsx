import { Text } from "@medusajs/ui"
import { ArrowUpRightMini } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import herobg from "./lifestyle-house-decoration-home-white.jpg"
import logo from "./hero-logo-white.svg"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] min-h-[700px] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div
        style={{ backgroundImage: `url(${herobg.src})` }}
        className="hero-background absolute inset-0 z-10 flex flex-col justify-center items-center text-center md:p-32 gap-6"
      >
        <div className="backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0 z-10" />
        <div className="bg-black/40 absolute top-0 bottom-0 left-0 right-0 z-10" />

        <div className="w-[85%] md:w-[50%] mx-auto text-center md:text-left md:mr-auto z-20 md:ml-0">
          <div>
            <Image
              src={logo.src}
              alt="hero logo"
              width={logo.width}
              height={logo.height}
              className="md:mr-auto md:ml-0 w-[90%] m-auto mb-10"
            />
          </div>
          <Text className="text-2xl leading-10 md:text-left font-normal text-white mb-5">
            Step into Home Wizardry Store, where your home comes alive! Discover gadgets that simplify life. Upgrade to a smarter home today and live the future!
          </Text>
          <LocalizedClientLink
            href="/store"
            className={
              "bg-[#131515] cursor-pointer [&_.shop-hover]:hover:rotate-45 [&_.shop-hover]:hover:brightness-0 flex gap-1 hover:text-black transition-all hover:bg-white w-fit text-white mx-auto md:mx-0 px-3 rounded py-1 shadow-[0_1px_10px_#ffffff4d]"
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
