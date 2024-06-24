import axios from "axios";
import { env } from "process";

export default async function updateArticle(
  id: number,
  { title, content, handle, metadata, active }
) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_ADMIN_BACKEND_URL ?? "").concat(endpoint);

  try {
    await axios.patch(
      getUrl("/admin/blog/").concat(id.toString()),
      {
        title,
        content,
        handle,
        active,
        metadata,
      },
      {
        withCredentials: true,
      }
    );
    return { ok: true };
  } catch (e) {
    return { ok: false };
  }
}
