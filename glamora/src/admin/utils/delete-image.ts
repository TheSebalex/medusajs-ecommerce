import axios from "axios";
import { env } from "process";
import Medusa from "@medusajs/medusa-js";

export default async function deleteImage(id: string, key?: string) {
  const medusa = new Medusa({
    baseUrl: env.MEDUSA_ADMIN_BACKEND_URL ?? "",
    maxRetries: 3,
  });
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_ADMIN_BACKEND_URL ?? "").concat(endpoint);

  if (key) {
    await medusa.admin.uploads
      .delete({
        file_key: key,
      })
      .then(() => {
        console.log("deleted");
      });
  }

  await axios.delete(getUrl("/admin/blog/images/" + id), {
    withCredentials: true,
  });
}
