// Principal TinyMCE script
import "tinymce/tinymce";

// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/models/dom";

import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/tinymce";

import { Editor } from "@tinymce/tinymce-react";

import getImages from "../../../utils/get-images";
import saveImage from "../../../utils/save-image";
import { useState, useEffect } from "react";

const BlogEditor = ({ initialValue, contentRef }: { initialValue?: string, contentRef: any }) => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getImages().then((images) =>
      setImages(
        images.map((img) => {
          return {
            title: img.metadata
              ? img.metadata.name ?? img.url.slice(0, 100)
              : img.url.slice(0, 100),
            value: img.url,
          };
        })
      )
    );
  }, []);

  return (
    images && (
      <Editor
      initialValue={initialValue}
        onEditorChange={(e) => contentRef.current = e}
        init={{
          resize: false,
          height: 650,
          plugins: ["link", "image", "table"],
          font_family_formats: "Poppins",
          content_style: `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
      body { 
        font-family: Poppins; cursor: text;
    
      };`,
          async images_upload_handler(blobInfo, progress) {
            progress(50);
            const { url } = await saveImage({
              file: new File([blobInfo.blob()], blobInfo.filename()),
              name: blobInfo.filename(),
            });
            progress(90);
            setImages([...images, url]);
            progress(100);
            return url;
          },
          image_list: images,
          link_default_protocol: "https",
          default_link_target: "_blank",
        }}
        toolbar="undo redo | image | link | blocks | bold italic underline | alignleft aligncenter alignright | table"
      />
    )
  );
};

export default BlogEditor;
