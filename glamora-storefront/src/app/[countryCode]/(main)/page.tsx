import { Product } from "@medusajs/medusa"
import { Metadata } from "next"
import { getCollectionsList, getProductsList, getRegion, getCategoriesList } from "@lib/data"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedCategories from "@modules/home/components/featured-categories"
import FeaturedArticles from "@modules/home/components/featured-articles/featured-articles"
import Hero from "@modules/home/components/hero"
import getBlogPosts from "@lib/util/get-blog"
import { Article } from "@lib/util/get-post"

export const metadata: Metadata = {
  title: "Glamora Store",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id], limit: 3 },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const { product_categories } = await getCategoriesList()
  const region = await getRegion(countryCode)

  const { results: articles } : { results: Article[] } = await getBlogPosts(0, 5);

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6 max-w-[1200px] mx-auto">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <div className="max-w-[1200px] mx-auto mb-12">
      <FeaturedArticles articles={articles} />
      </div>
      <div className="max-w-[1200px] mx-auto mb-16">
        <FeaturedCategories categories={product_categories} />
      </div>
    </>
  )
}
