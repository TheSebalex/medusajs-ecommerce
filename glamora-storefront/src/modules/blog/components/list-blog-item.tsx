"use client"
/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import Link from "next/link"
import { Container } from "@medusajs/ui"
import { format } from "date-fns"

export default function ListBlogItem({
  title,
  content,
  image,
  pub_date,
  handle,
}: {
  title: string
  content: string
  handle: string
  image?: string
  pub_date?: string
}) {
  const sliceValue = image ? 100 : 350

  const getDescriptionText = (html: string) => {
    const div = document.createElement("div")
    div.insertAdjacentHTML("afterbegin", html)
    let text = ""
    div.innerText.split(/\s+/g).forEach((t) => {
      if (text.length < sliceValue) {
        text = `${text} ${t}`
      }
    })
    return text.trim() + (div.innerText.length > sliceValue ? "..." : "")
  }

  return (
    <>
      <Container className="w-full flex flex-col relative m-auto h-full">
        {image && (
          <Link href={`/blog/${handle}`}>
            <div className="min-h-[200px]">
              <div className="absolute rounded-t-lg top-0 left-0 bottom-0 right-0 object-cover w-full h-[200px]">
                <Image
                  src={image}
                  alt={`${title} thumbnail`}
                  className="absolute rounded-t-lg top-0 left-0 bottom-0 right-0 object-cover w-full h-[200px]"
                />
              </div>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-y-4 flex-grow">
          <Link href={`/blog/${handle}`}>
            <h3 className="font-medium text-lg capitalize">{title}</h3>
          </Link>
          <p className="text-md">{getDescriptionText(content)}</p>
          <div className="flex justify-between pt-4 items-end mt-auto mb-0">
            <Link
              className="px-3 rounded-lg text-xs bg-gradient-to-tr shadow from-[#339989] to-[#7de2d1] text-white py-2 hover:brightness-90 transition-all"
              href={`/blog/${handle}`}
            >
              Read more
            </Link>
            <p className="text-xs text-gray-500">
              {format(new Date(pub_date ?? new Date()), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
