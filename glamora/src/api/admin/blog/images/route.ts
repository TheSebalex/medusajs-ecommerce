import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");

  const results = await blogService.getImages();
  res.json(results);
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const blogService = req.scope.resolve<BlogService>("blogService");
	const bodyParams: any = req.body;
	if(!bodyParams.name || !bodyParams.url) {
		res.sendStatus(400);
		return
	}
	const { name, url, key } = bodyParams;
	await blogService.saveImage(name, url, key);
	res.sendStatus(200);
}
