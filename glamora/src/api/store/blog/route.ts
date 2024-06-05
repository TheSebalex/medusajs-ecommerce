import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../services/blog";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  // Proporcionar valores por defecto y asegurarse de que son strings
  let { limit, page }: any = req.query;

  let { parsedLimit, parsedPage } = {
    parsedLimit: parseInt(limit ?? "10"),
    parsedPage: parseInt(page ?? "1"),
  };

  parsedPage = parsedPage >= 1
    ? parsedPage
    : 1

  const results = await blogService.getAll(parsedLimit, parsedPage - 1);
  res.json(results);
}
