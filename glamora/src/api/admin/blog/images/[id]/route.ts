import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../../services/blog";

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogService>("blogService");
  const id: string = req.params.id;

  try {
    const status: boolean = await blogService.deleteImage(id);
    if (!status) throw new Error("Could not delete image");
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}
