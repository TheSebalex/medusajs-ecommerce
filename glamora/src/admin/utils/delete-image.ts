import axios from "axios";
import { env } from "process";
import Medusa from "@medusajs/medusa-js";

export default async function deleteImage(id: string, key?: string) {
  const medusa = new Medusa({
    baseUrl: env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    maxRetries: 3,
  });
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_BACKEND_URL || "http://localhost:9000").concat(endpoint);

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
