"use server"
import { BackBar } from "@/components/common/back-bar";
import { ImageGallery } from "@/components/gallery/image-gallery";
import { Separator } from "@/components/ui/separator";
import { CollectionInfo, getCollectionsInfo, getHighResImage, getImagesFromFolder } from "@/lib/actions/image_collections";

export default async function Page() {
  const collections : CollectionInfo[] = await getCollectionsInfo() ?? []

  return (
    <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Image Gallery"}</h1>
        <h2 className="text-2xl md:text-3xl xl:text-5xl mt-1">Some photos worth sharing 📸</h2>
      </div>
      <BackBar/>
      {collections.map((collection, index) => {
        return <div className="flex flex-col gap-4 lg:gap-8" key={index}>
          <div className="flex gap-3">
            <span><a href={`/gallery/${collection.path ?? ""}`} className="text-2xl md:text-3xl xl:text-5xl font-medium hover:underline hover:cursor-pointer pr-2">{collection.title}</a></span>
          </div>
          <Separator className="bg-foreground"/>
        </div>
      })}
    </main>
  )
}

