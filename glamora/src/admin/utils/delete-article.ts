import axios from "axios";
import { env } from "process";

export default async function deleteArticle(
  id: number,
) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_BACKEND_URL || "http://localhost:9000").concat(endpoint);

  try {
    await axios.delete(
      getUrl("/admin/blog/").concat(id.toString()),
      {
        withCredentials: true,
      }
    );
    return { ok: true };
  } catch (e) {
    return { ok: false };
  }
}
