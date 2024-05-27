"use client"
import { ProductCollection } from "@medusajs/medusa"
import { MouseEventHandler, useState } from "react"
import { ArrowUpRightMini } from "@medusajs/icons"
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
        className={`text-white bg-gradient-to-r h-full relative px-4 from-[#4f4064] to-[#a296c0] transition-all ${
          !showCategories && "hover:brightness-125"
        }`}
        onClick={handleClick}
      >
        Collections
        <ul
          className={`absolute hidden top-[105%] right-0 min-w-[100%] w-max md:grid max-w-[100vw] transition-all overflow-hidden md:rounded-lg [&_a]:px-4 hover:[&_a]:text-white text-black bg-[#e4deff] [&_a]:py-2 hover:[&_a]:bg-[#c1a9df] [&_a]:gap-2 [&_a]:flex [&_a]:transition-all  ${
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
        <div
          className={`fixed p-10 md:hidden place-content-center right-[5%] bottom-[5%] left-[5%] top-[10%] w-auto max-w-[100vw] rounded-lg bg-black/50 backdrop-blur-lg [&_a]:py-2 shadow-xl [&_a]:gap-2 transition-all [&_a]:transition-all ${
            animateCategories
              ? "show-categories-mobile"
              : "hide-categories-mobile"
          }  ${showCategories ? "grid" : "hidden"}`}
        >
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
      </button>
    </>
  )
}
