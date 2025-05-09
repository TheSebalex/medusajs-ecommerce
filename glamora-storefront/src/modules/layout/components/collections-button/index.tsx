"use client"
import { ProductCollection } from "@medusajs/medusa"
import { MouseEventHandler, useState } from "react"
import { ArrowUpRightMini, XMark } from "@medusajs/icons"
export function CollectionsButton({
  collections,
}: {
  collections: ProductCollection[]
}) {
  const [showCategories, setShowCategories] = useState(false)
  const [animateCategories, setAnimateCategories] = useState(false)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.currentTarget.tagName === "BUTTON") {
      if (!showCategories)
        setTimeout(() => setAnimateCategories(!showCategories), 150)
      else setAnimateCategories(!showCategories)

      if (showCategories)
        setTimeout(() => setShowCategories(!showCategories), 150)
      else setShowCategories(!showCategories)
    }
  }

  return (
    <>
      <button
        className={`text-white bg-gradient-to-r h-[65%] rounded relative px-3 outline-none drop-shadow from-[#52c5b4] to-[#48b1a1] transition-all ${
          !showCategories &&
          "hover:brightness-105 hover:shadow-[0_0_10px_3px_#ffffff4d]"
        }`}
        onClick={handleClick}
      >
        Collections
        <ul
          className={`absolute hidden top-[135%] right-0 min-w-[100%] w-max md:grid max-w-[100vw] transition-all overflow-hidden md:rounded-lg [&_a]:px-4 hover:[&_a]:text-white text-black bg-[#7de2d1] [&_a]:py-2 hover:[&_a]:bg-[#339989] [&_a]:gap-2 [&_a]:flex [&_a]:transition-all  ${
            showCategories ? "show-categories" : "hide-categories"
          }`}
        >
          {collections.map((collection, key) => (
            <li key={key}>
              <a
                className="[&_.collection-hover]:hover:rotate-45"
                href={`/collections/${collection.handle}`}
              >
                {collection.title}
                <ArrowUpRightMini
                  className="ml-auto mr-0 collection-hover ease-in-out duration-150"
                  color="#4f4064"
                />
              </a>
            </li>
          ))}
        </ul>
      </button>
      <div
        className={`fixed p-10 text-center text-white md:hidden place-content-center right-[5%] bottom-[5%] left-[5%] top-[10%] w-auto max-w-[100vw] rounded-lg bg-black/50 backdrop-blur-lg [&_a]:py-2 shadow-xl [&_a]:gap-2 transition-all [&_a]:transition-all ${
          animateCategories
            ? "show-categories-mobile"
            : "hide-categories-mobile"
        }  ${showCategories ? "grid" : "hidden"}`}
      >
        <div
          className="cursor-pointer absolute top-2 right-2 z-30"
          onClick={() => {
            setShowCategories(false)
          }}
        >
          <XMark color="white" />
        </div>
        <h2 className="absolute top-4 w-full mx-auto mt-0 text-2xl">
          Collections
        </h2>
        {collections.map((collection, key) => (
          <a
            key={key}
            className="text-lg flex items-center hover:underline text-center mx-auto [&_svg]:h-full [&_.collection-hover]:hover:rotate-45"
            href={`/collections/${collection.handle}`}
          >
            {collection.title}
            <ArrowUpRightMini
              className="collection-hover ease-in-out duration-150"
              color="white"
            />
          </a>
        ))}
      </div>
    </>
  )
}
