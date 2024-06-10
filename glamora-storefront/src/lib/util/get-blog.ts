import { env } from "process"
import axios from "axios"
export default async function getBlogPosts(
  page?: number | string,
  limit?: number | string
): Promise<any> {
  const baseUrl: string = (
    env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:9000/"
  ).concat("store/blog")

  const params = new URLSearchParams()

  params.append("page", page ? page.toString() : "1")
  params.append("limit", limit ? limit.toString() : "10")

  let url = baseUrl.concat("?").concat(params.toString())

  let response

  try {
    response = await axios.get(url)
  } catch (e) {
    console.log(e)
    return { results: [], pages: 0 }
  }

  if (response.data) return response.data
  else return { results: [], pages: 0 }
}
