"use client"
/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import Link from "next/link"
import { Container } from "@medusajs/ui"

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
  const getDescriptionText = (html: string) => {
    const div = document.createElement("div")
    div.insertAdjacentHTML("afterbegin", html)
    let text = ""
    div.innerText.split(" ").forEach((t) => {
      if (text.length < 100) {
        text = `${text} ${t}`
      }
    })
    return text + (div.innerText.length > 100 ? "..." : "")
  }

  return (
    <>
      <Container className="w-full relative">
        {image && (
          <Link href={`/blog/${handle}`}>
            <div className="min-h-[200px]">
              <img
                src={image}
                alt={`${title} thumbnail`}
                className="absolute rounded-t-lg top-0 left-0 bottom-0 right-0 object-cover w-full h-[200px]"
              />
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-y-4">
          <Link href={`/blog/${handle}`}>
            <h3 className="font-medium text-lg">{title}</h3>
          </Link>
          <p className="text-md">{getDescriptionText(content)}</p>
          <div className="flex justify-between items-end pt-4">
            <Link
              className="px-3 rounded-lg text-xs bg-gradient-to-tr shadow from-[#a296c0] to-[#e4deff] text-white py-2 hover:brightness-90 transition-all"
              href={`/blog/${handle}`}
            >
              Read more
            </Link>
            <p className="text-xs text-gray-500">
              {new Date(pub_date ?? "").toDateString()}
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
