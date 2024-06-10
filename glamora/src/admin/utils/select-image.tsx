import { createRoot } from 'react-dom/client';
import getImages from "./get-images";
import SelectImageComponent from "../components/select-image-component/select-image-component";

export default async function selectImage(title : string): Promise<any> {
  let selected: any = null;

  const images: any[] = await getImages();

  const div: HTMLDivElement = document.createElement("div");
  const root = createRoot(div); 
  document.body.appendChild(div);
  selected = await new Promise((resolve) => {
    root.render(<SelectImageComponent title={title} images={images} resolve={resolve}/>);
  });
  div.remove();
  return selected;
}
