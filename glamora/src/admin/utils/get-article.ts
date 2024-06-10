import axios from "axios";
import { env } from "process";

export default async function getArticle(id: number) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_BACKEND_URL || "http://localhost:9000").concat(endpoint);

  const { data } = await axios.get(getUrl("/admin/blog/".concat(id.toString())), {
    withCredentials: true
  });

  return data;
}
