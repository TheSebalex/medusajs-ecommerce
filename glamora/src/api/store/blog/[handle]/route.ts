import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  const handle = req.params.handle;
  const results = await blogService.getOneByHandle(handle, true);
  res.json(results);
}
