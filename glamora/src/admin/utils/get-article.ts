import axios from "axios";
import { env } from "process";

export default async function getArticle(id: number) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_ADMIN_BACKEND_URL ?? "").concat(endpoint);

  const { data } = await axios.get(getUrl("/admin/blog/".concat(id.toString())), {
    withCredentials: true
  });

  return data;
}
