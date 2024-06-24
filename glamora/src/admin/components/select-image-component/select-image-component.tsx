import { Drawer, Button, toast, Toaster } from "@medusajs/ui";
import { Trash } from "@medusajs/icons";
import { useState } from "react";
import deleteImage from "../../utils/delete-image";
import saveImage from "../../utils/save-image";
import getImages from "../../utils/get-images";

export default function SelectImageComponent({
  images,
  resolve,
  title
}: {
  images: any[];
  resolve: Function;
  title: string
}) {
  const [displayImages, setDisplayImages] = useState(images);

  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(true);
  return (
    <>
      <Drawer open={show} onOpenChange={setShow}>
        <Drawer.Content className="m-5 w-1/2">
          <Drawer.Header>
            <Drawer.Title className="flex items-center gap-4">
              {title}{" "}
              <Button
                onClick={async () => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = async () => {
                    const file = input.files[0];
                    await saveImage({ file: file, name: file.name });
                    setDisplayImages(await getImages());
                    toast.success("Image added");
                  };
                  input.click();
                }}
              >
                Add Image
              </Button>
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="p-4 overflow-y-scroll">
            <div className="grid grid-cols-3 gap-4">
              {displayImages.map((img, i) => {
                return (
                  <div key={i} className="w-full relative">
                    <img
                      src={img.url}
                      onClick={() => setSelected(i)}
                      className={`${
                        selected === i ? "border-[green]" : "border-transparent"
                      } cursor-pointer border-2 w-full aspect-square rounded-lg shadow object-cover`}
                    />
                    <div
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={async () => {
                        await deleteImage(img.id, img.metadata?.key);
                        setDisplayImages(await getImages());
                        toast.success("Image deleted");
                      }}
                    >
                      <Trash width={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button
              onClick={() => {
                setShow(false);
                setTimeout(() => resolve(null), 10);
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShow(false);
                if(selected ?? false) setTimeout(() => resolve(displayImages[selected]), 10);
              }}
            >
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
      <Toaster />
    </>
  );
}
