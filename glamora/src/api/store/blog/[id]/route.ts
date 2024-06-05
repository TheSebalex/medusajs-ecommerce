import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  const id = req.params.id;
  const results = await blogService.getOne(parseInt(id));
  res.json(results);
}
