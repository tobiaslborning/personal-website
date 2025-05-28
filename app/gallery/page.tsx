"use server"
import { ImageGallery } from "@/components/gallery/image-gallery";
import { Separator } from "@/components/ui/separator";
import { getImagesFromFolder } from "@/lib/utils/getImages";

export default async function Page() {
  const [images_ms, images_fr] = await Promise.all([
    getImagesFromFolder("images/molde-stryn"),
    getImagesFromFolder("images/freeride")
  ]);
  
  return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Image Gallery"}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      {/* Freeride */}
      <div className="flex flex-col">
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Freeriding & ski touring at Rødde</h2>
        <ImageGallery images={images_fr} />
      </div>

      <Separator className="bg-foreground"/>

      {/* Molde and Stryn */}
      <div className="flex flex-col">
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Trip to Molde & Stryn</h2>
        <ImageGallery images={images_ms} />
      </div>
    </main>
  )
}

