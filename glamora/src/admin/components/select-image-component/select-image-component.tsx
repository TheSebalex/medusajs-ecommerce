import React from "react";
import { Drawer, Button, toast, Toaster } from "@medusajs/ui";
import { Trash } from "@medusajs/icons";
import { useState, useRef, useEffect } from "react";
import deleteImage from "../../utils/delete-image";
import saveImage from "../../utils/save-image";
import getImages from "../../utils/get-images";

export default function SelectImageComponent({
  images,
  resolve,
  title,
}: {
  images: any[];
  resolve: Function;
  title: string;
}) {
  const [displayImages, setDisplayImages] = useState(images);

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
                      width={200}
                      height={200}
                      onClick={() => {
                        setShow(false);
                        setTimeout(() => resolve(img), 10);
                      }}
                      className={`cursor-pointer border-2 w-full aspect-square rounded-lg shadow object-cover`}
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
              variant="secondary"
              onClick={() => {
                setShow(false);
                setTimeout(() => resolve(null), 10);
              }}
            >
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
      <Toaster />
    </>
  );
}
