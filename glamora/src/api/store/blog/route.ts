import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../services/blog";

interface BlogPostParams {
  content: string;
  title: string;
  handle: string;
  active?: boolean;
  metadata?: {
    key: string;
    content: string;
  }[];
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");

  const bodyParams: BlogPostParams | any = req.body;

  if (!bodyParams.content) {
    res.sendStatus(400);
    return;
  }

  if (!bodyParams.title) {
    res.sendStatus(400);
    return;
  }

  if (!bodyParams.handle) {
    res.sendStatus(400);
    return;
  }

  try {
    const { title, content, handle, metadata = [], active } = bodyParams;
    await blogService.insert({
      title,
      content,
      image:
        metadata.find(
          (m: { key: string; content: string }) => m.key === "image"
        ) ?? undefined,
      handle,
      active,
      metadata,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
