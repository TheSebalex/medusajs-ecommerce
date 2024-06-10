import axios from "axios"
import { env } from "process"

export interface Article {
    title: string
    content: string
    metadata: { key: string; content: string }[]
    pub_date: string
    handle: string
    active: boolean
    id: number
    error? : any
}

export default async function getArticle(handle: string | undefined) : Promise<Article> {
  const baseUrl: string = (
    env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:9000/"
  )
    .concat("store/blog/")
    .concat(handle ?? "")

  const post: Article = await axios.get(baseUrl).then((response) => response.data)

  return post
}
