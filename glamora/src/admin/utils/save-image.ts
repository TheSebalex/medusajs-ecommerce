import axios from "axios";
import { env } from "process";

export default async function saveImage({
  file,
  name,
}: {
  file: File;
  name?: string;
}) {
  const getUrl = (endpoint: string): string =>
    (env.MEDUSA_ADMIN_BACKEND_URL ?? "").concat(endpoint);

  try {
    const formData = new FormData();
    formData.append("files", file);
    const { data } = await axios.post(getUrl("/admin/uploads"), formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { uploads } = data;

    let returnUrl: string = "";

    await Promise.all(
      uploads.map(async (upload: any) => {
        let { url, key } = upload;
        returnUrl = url;
        await axios.post(
          getUrl("/admin/blog/images"),
          {
            name,
            url,
            key
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
    );
    return { ok: true, url: returnUrl };
  } catch (e) {
    console.error(e);
    return { ok: false, url: null };
  }
}
