import { Metadata } from "next"
import getBlogPosts from "@lib/util/get-blog"
import ListBlogItem from "@modules/blog/components/list-blog-item"
import Pagination from "@modules/blog/components/pagination"

export const metadata: Metadata = {
  title: "Blog",
  description: "See the best articles on our blog",
}

export default async function BlogList({ searchParams }: any) {

  const posts: { results: any[]; pages: number } = await getBlogPosts(
    searchParams?.page,
    searchParams?.limit
  )

  return (
    <>
      <div className="flex flex-col gap-x-6 max-w-[1200px] mx-auto p-5 lg:p-12">
        <h1 className="font-normal font-sans txt-xlarge">Blog</h1>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          {posts.results.map((post) => (
            <ListBlogItem
              key={post.handle}
              title={post.title}
              content={post.content}
              handle={post.handle}
              image={
                post.metadata?.find((m: any) => m.key === "image")?.content
              }
              pub_date={post.pub_date}
            />
          ))}
        </ul>
        <Pagination
          pagesCount={posts.pages}
          currentPage={parseInt(searchParams?.page ?? "1")}
          url="/blog?page=#num#"
        />
      </div>
    </>
  )
}
