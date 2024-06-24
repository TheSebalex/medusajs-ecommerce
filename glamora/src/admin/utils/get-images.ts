import axios from "axios";
import { env } from "process";

export default async function getImages() : Promise<any[]> {
  const { data: images } = await axios.get(
    (env.MEDUSA_ADMIN_BACKEND_URL ?? "").concat(
      "/admin/blog/images"
    ),
    {
      withCredentials: true,
    }
  );
  return images;
}
