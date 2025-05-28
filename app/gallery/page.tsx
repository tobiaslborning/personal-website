"use server"
import { ImageGallery } from "@/components/gallery/image-gallery";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getImagesFromFolder } from "@/lib/utils/getImages";


export default async function Page() {
  const images_ms = await getImagesFromFolder("images/molde-stryn")
  const images_fr = await getImagesFromFolder("images/freeride")

  return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
          <span>{"Image Gallery"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      {/* Freeride */}
      <div className="flex flex-col">
        <h2 className="text-1xl md:text-3xl xl:text-4xl">Freeriding & ski touring at Rødde</h2>
        <ImageGallery images={images_fr} />
      </div>

      <Separator className="bg-foreground"/>

      {/* Molde and Stryn */}
      <div className="flex flex-col">
        <h2 className="text-1xl md:text-3xl xl:text-4xl">Trip to Molde & Stryn</h2>
        <ImageGallery images={images_ms} />
      </div>
    </main>
  )
}

