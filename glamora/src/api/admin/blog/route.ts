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
    const { title, content, handle, metadata, active } = bodyParams;
    await blogService.insert({
      title,
      content,
      handle,
      active,
      metadata,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  // Proporcionar valores por defecto y asegurarse de que son strings
  let { limit, offset}: any = req.query;

  let { parsedLimit, parsedOffset } = {
    parsedLimit: limit ? parseInt(limit) : undefined,
    parsedOffset: offset ? parseInt(offset) : 0,
  };

  const results = await blogService.getAll(parsedLimit, parsedOffset);
  res.json(results);
}
