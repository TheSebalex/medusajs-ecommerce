"use client"

import Link from "next/link"
import { ChevronRight, ChevronLeft } from "@medusajs/icons"
import { Dispatch, useEffect, useState } from "react"

export default function Pagination({
  pagesCount,
  url,
  currentPage,
}: {
  pagesCount: number
  url: string
  currentPage: number
}) {
  const [pages, setPages]: [number[], Dispatch<number[]>] = useState([0])

  useEffect(() => {
    let newPages: number[] = new Array(pagesCount).fill(0).map((_, i) => i + 1)

    if (pagesCount > 5) {
      newPages = newPages.slice(
        Math.max(currentPage - 3, 0),
        Math.min(currentPage + 2, pagesCount)
      )
    }

    setPages(newPages)
  }, [pagesCount, currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="grid grid-cols-[5%_90%_5%]">
        {currentPage === 1 ? (
          <button disabled className="flex justify-center items-center">
            <ChevronLeft color="grey" />
          </button>
        ) : (
          <Link
            className="flex justify-center items-center"
            href={url.replace("#num#", (currentPage - 1).toString())}
          >
            <ChevronLeft color="black" />
          </Link>
        )}
        <ul className="flex gap-5 p-8 w-full justify-center lg:gap-10">
          {!pages.includes(1) && (
            <li>
              <Link href={url.replace("#num#", "1")}>1...</Link>
            </li>
          )}
          {pages.map((page) => (
            <li key={page}>
              <Link href={url.replace("#num#", page.toString())}>
                <span
                  className={`rounded-full w-[1.5rem] aspect-square flex justify-center items-center ${
                    page === currentPage ? "bg-[#d8d5ce]" : ""
                  }`}
                >
                  {page}
                </span>
              </Link>
            </li>
          ))}
          {!pages.includes(pagesCount) && (
            <li>
              <Link href={url.replace("#num#", pagesCount.toString())}>
                ...{pagesCount}
              </Link>
            </li>
          )}
        </ul>
        {currentPage === pagesCount ? (
          <button disabled className="flex justify-center items-center">
            <ChevronRight color="grey" />
          </button>
        ) : (
          <Link
            className="flex justify-center items-center"
            href={url.replace("#num#", (currentPage + 1).toString())}
          >
            <ChevronRight color="black" />
          </Link>
        )}
      </div>
    </>
  )
}
