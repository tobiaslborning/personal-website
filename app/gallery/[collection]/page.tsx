import { ImageGallery } from "@/components/gallery/image-gallery"
import { Separator } from "@/components/ui/separator"
import { CollectionInfo, getImagesFromFolder, getCollectionInfo } from "@/lib/actions/image_collections"


interface PageProps {
  params: Promise<{
      collection: string
  }>
}

export default async function Post({ params } : PageProps ) {
    const { collection } = await params

    const fetched_collection : CollectionInfo | undefined = await getCollectionInfo(`collections/${collection}`) 
    const images : ImageFetchData[] = await getImagesFromFolder(`collections/${collection}/preview`) 

    if (!fetched_collection) {
        return <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
            <div>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">Error</h1>
            </div>
        </main>
    }

    return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{fetched_collection.title}</h1>
        <h2 className="text-2xl md:text-3xl xl:text-5xl"></h2>
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/gallery">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      <ImageGallery images={images} collection_name={collection}/>
    </main>
    )
}