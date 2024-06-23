import Link from "next/link"
import { listRegions } from "@lib/data"
import getArticle, { Article } from "@lib/util/get-post"
import getBlog from "@lib/util/get-blog"
import { format } from "date-fns"
import { Heading } from "@medusajs/ui"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"

type Props = {
  params: {
    handle: string
    countryCode: string
  }
}

export async function getStaticPaths() {
  const handles: string[] = await getBlog().then((articles) =>
    articles.results.map((article: Article) => article.handle)
  )

  const regions: any[] = await listRegions().then((regions: any) =>
    regions
      .map((reg: any) => reg.countries.map((country: any) => country.iso_2))
      .reduce((a: any, b: any) => [...a, ...b])
  )

  const paths = regions
    .map((region) =>
      handles.map((handle) => ({ params: { handle, countryCode: region } }))
    )
    .flat()

  return {
    paths,
    fallback: false,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const article = await getArticle(handle)

  const images = article.metadata
    ?.filter((mt: any) => mt.key == "images")
    .map((m: any) => ({
      url: m.content,
    }))

  const keywords = article.metadata
    ?.filter((mt: any) => mt.key == "keywords")
    .map((m: any) => m.content)

  const description =
    article?.metadata?.find((m: any) => m.key === "description")?.content ??
    article.title

  const og = article?.metadata
    ?.filter((m: any) => m.key.startsWith("og:") || m.key == "images")
    ?.map((r: any) => ({
      key: r.key.split(":")[1] ?? r.key,
      content: r.content,
    }))
    ?.reduce((a: any, b: { key: string; content: string }) => {
      if (a[b.key]) {
        if (Array.isArray(a[b.key])) a[b.key].push(b.content)
        else a[b.key] = [...a[b.key], b.content]
      } else {
        a[b.key] = b.content
      }
      return a
    }, {})

  return {
    title: `${article?.title ?? "404"}`,
    description: `${description ?? ""}`,
    keywords,
    openGraph: {
      title: `${article.title ?? "404"}`,
      description: `${description ?? article.title ?? ""}`,
      images: images ?? [],
      ...og,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const post: Article = await getArticle(params.handle as string)

  if (post.error) {
    notFound()
  }

  const image = post.metadata?.find((m: any) => m.key === "images" || m.key === "og:image" || m.key === "image")?.content || post.metadata?.find((m: any) => m.key === "og:images")?.content

  const hidePrincipalImage = Boolean(
    post.metadata?.find((meta) => meta.key == "image:not-show")?.content ??
      "false"
  )

  return (
    <>
      <div className="flex flex-col gap-x-6 max-w-[1200px] mx-auto mb-12 p-5 lg:p-12">
        <div id="breadcrumbs" className="mb-6 text-ui-fg-muted text-sm">
          <Link className="hover:text-ui-fg-interactive" href="/">
            Home
          </Link>{" "}
          /{" "}
          <Link className="hover:text-ui-fg-interactive" href="/blog">
            Blog
          </Link>{" "}
          / {post.title}
        </div>
        <Heading level={"h1"} className="text-[1.5rem] capitalize">
          {post.title}
        </Heading>
        {image && hidePrincipalImage && (
          <div className="relative aspect-video w-full rounded overflow-hidden mt-4 max-h-[70vh]">
            <Image src={image} alt="article image" fill objectFit="cover" />
          </div>
        )}
        <span className="mb-5 txt-medium-plus text-ui-fg-muted">
          {format(new Date(post?.pub_date) ?? new Date(), "MMMM dd, yyyy")}
        </span>
        <article
          className="max-w-[100%] overflow-clip prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>
      </div>
    </>
  )
}
