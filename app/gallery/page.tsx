"use server"
import { ImageGallery } from "@/components/gallery/image-gallery";
import { Separator } from "@/components/ui/separator";
import { CollectionInfo, getCollectionsInfo, getHighResImage, getImagesFromFolder } from "@/lib/actions/image_collections";

export default async function Page() {
  const collections : CollectionInfo[] = await getCollectionsInfo() ?? []

  return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Image Gallery"}</h1>
        <h2 className="text-2xl md:text-3xl xl:text-5xl">Some photos worth sharing :)</h2>
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      {collections.map((collection, index) => {
        return <div className="flex flex-col gap-8" key={index}>
          <div className="flex gap-3">
            <span className="text-2xl md:text-3xl xl:text-5xl">{">"}</span>
            <span><a href={`/gallery/${collection.path ?? ""}`} className="text-2xl md:text-3xl xl:text-5xl font-medium hover:italic hover:cursor-pointer pr-2">{collection.title}</a></span>
          </div>
          <Separator className="bg-foreground"/>
        </div>
      })}
    </main>
  )
}

