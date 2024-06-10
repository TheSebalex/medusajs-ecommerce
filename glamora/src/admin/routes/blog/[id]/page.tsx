import { Container } from "@medusajs/ui";
import { Input, Label, Switch, Button, toast, Toaster } from "@medusajs/ui";
import { ArrowUpRightOnBox, ArrowLeft } from "@medusajs/icons";
import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import MetadataTable from "../../../components/blog/create/metadata-table";
import BlogEditor from "../../../components/blog/create/blog-editor";
import selectImage from "../../../utils/select-image";
import { useParams } from "react-router-dom";
import getArticle from "../../../utils/get-article";
import updateArticle from "../../../utils/update-article";
import { useNavigate } from "react-router-dom";

const EditBlogArticle = () => {
  const contentRef = useRef("");
  const [error404, setError404] = useState(false);
  const [metadata, setMetadata] = useState([]);

  const navigate = useNavigate();

  const [initContentValue, setInitContentValue] = useState("");

  const { id }: { id: string } | any = useParams();

  const titleRef = useRef(null);
  const handleRef = useRef(null);

  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const update = async (e) => {
    if (titleRef.current.value.trim() == "") {
      toast.error("Title is required");
      return;
    }
    if (contentRef.current.trim() == "") {
      toast.error("Content is required");
      return;
    }
    if (handleRef.current.value.trim() == "") {
      toast.error("Handle is required");
    }

    e.target.disabled = true;

    const status: { ok: boolean } = await updateArticle(parseInt(id), {
      title: titleRef.current.value,
      content: contentRef.current,
      handle: handleRef.current.value,
      metadata: metadata,
      active: isChecked,
    });
    if (status.ok) {
      toast.success("Article created successfully", {
        duration: 3000,
      });
      setTimeout(() => {
        const a = document.createElement("a");
        navigate("/a/blog");
        a.click();
      }, 3000);
    } else e.target.disabled = false;
  };

  useEffect(() => {
    const setArticleData = async () => {
      const article = await getArticle(parseInt(id));
      if (!article.error && article.title) {
        titleRef.current.value = article.title;
        handleRef.current.value = article.handle;
        contentRef.current = article.content;
        setInitContentValue(article.content);
        setMetadata(article.metadata);
        setIsChecked(article.active);
      } else {
        setError404(true);
      }
    };
    setArticleData();
  }, []);

  return (
    <div className="pb-[70px]">
      <Container>
        <div
          className={`${
            !error404 ? "hidden" : ""
          } inter-large-semibold gap-x-base flex mb-10 justify-between`}
        >
          <h1>Not found (404)</h1>
          <Link to="/a/blog">
            <Button variant="secondary" className="btn-small">
              <ArrowLeft />
              Back to blog
            </Button>
          </Link>
        </div>
        <div
          className={`${
            error404 ? "hidden" : ""
          } inter-large-semibold gap-x-base flex mb-10 justify-between`}
        >
          <h1>Edit article</h1>
          <Button onClick={update} variant="secondary" className="btn-small">
            <ArrowUpRightOnBox />
            Edit
          </Button>
        </div>
        <div
          className={`${
            error404 ? "hidden" : ""
          } [&_div.tox-promotion]:hidden [&_.tox-statusbar\_\_branding]:hidden`}
        >
          <div className="px-1 mb-5 flex gap-5 [&>*:nth-child(1)]:w-1/3 [&>*:nth-child(1)]:flex-grow">
            <Input ref={titleRef} placeholder="Title" />
            <Input
              placeholder="Handle"
              ref={handleRef}
              onKeyUp={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\s+/g,
                  "-"
                );
              }}
              onChange={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\s+/g,
                  "-"
                );
              }}
            />
            <div className="flex gap-2 items-center">
              <Label htmlFor="manage-inventory">Active</Label>
              <Switch checked={isChecked} onCheckedChange={handleToggle} />
            </div>
          </div>
          <BlogEditor initialValue={initContentValue} contentRef={contentRef} />
        </div>
        <div
          className={`${
            error404 ? "hidden" : ""
          } mt-8 mb-10 flex items-center gap-4`}
        >
          <h2 className="inter-large-semibold gap-x-base flex justify-between">
            Metadata
          </h2>
          <Button
            onClick={async () => {
              const selected = await selectImage("Select featured image");
              if (selected) {
                setMetadata([
                  ...metadata.filter((m) => m.key !== "og:images"),
                  { key: "og:images", content: selected.url, editting: false },
                ]);
              }
            }}
          >
            Add featured image
          </Button>
        </div>
        <div className={error404 ? "hidden" : ""}>
          <MetadataTable metadataState={[metadata, setMetadata]} images={[]} />
        </div>
      </Container>
      <Toaster />
    </div>
  );
};

export default EditBlogArticle;
