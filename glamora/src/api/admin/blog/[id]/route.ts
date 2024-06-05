import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  const id = req.params.id;
  const results = await blogService.getOne(parseInt(id));
  res.json(results);
}

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");

  const id: any = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400);

  const allowed = ["title", "content", "handle", "active"];

  const bodyParams: any = req.body;
  const patchValues = {};

  allowed.forEach((key) => {
    if (key in bodyParams) {
      patchValues[key] = bodyParams[key];
    }
  });

  try {
    await blogService.patch(
      id,
      {
        ...patchValues,
      },
      bodyParams.metadata
        ? bodyParams.metadata
            .map((meta : any): { value: string; content: string } => ({
              value: meta.key,
              content: meta.content,
            }))
            .filter(
              (m: { value: string; content: string }) => m.value && m.content
            )
        : undefined
    );
    return res.send("OK");
  } catch (e) {
    console.error(e);
    return res.status(400).send(e.message);
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");

  const id: number = parseInt(req.params.id);

  if (!id) return res.status(400);

  if (isNaN(id)) return res.status(400);

  try {
    await blogService.delete(id);
    return res.send("OK");
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}
