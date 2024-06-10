import { Container, Button } from "@medusajs/ui";
import { ArrowUpRightOnBox, Window } from "@medusajs/icons";
import BlogTable from "../../components/blog/blog-table";
import { Link } from "react-router-dom";
import { env } from "process";
import { RouteConfig } from "@medusajs/admin";

const BlogAdmin = () => {  

  const backendApiUrl = (env.MEDUSA_BACKEND_URL || "http://localhost:9000").concat("/admin/blog")

  return (
    <div className="pb-[70px]">
    <Container >
      <div className="inter-large-semibold gap-x-base flex mb-10 justify-between">
        <h1>Blog</h1>
        <Link to="/a/blog/create">
        <Button variant="secondary" className="btn-small">
          <ArrowUpRightOnBox />
          Create
        </Button>
        </Link>
      </div>
      <BlogTable urlApi={backendApiUrl}/>
    </Container>
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Blog",
    icon: Window,
  },
}

export default BlogAdmin;
