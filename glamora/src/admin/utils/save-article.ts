import axios from "axios";
import { env } from "process";

export default async function saveArticle({
  title,
  content,
  handle,
  metadata,
  active,
}) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_ADMIN_BACKEND_URL || "http://localhost:9000").concat(endpoint);

  try {
    await axios.post(
      getUrl("/admin/blog"),
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
