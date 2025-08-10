
import { CollectionHeader } from "@/components/gallery/collection-header"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { CollectionInfo, getImagesFromFolder, getCollectionInfo } from "@/lib/actions/image_collections"
import { shuffleInPlace } from "@/lib/utils"


interface PageProps {
  params: Promise<{
      collection: string
  }>
}

export default async function Post({ params } : PageProps ) {
    const { collection } = await params

    const fetched_collection : CollectionInfo | undefined = await getCollectionInfo(`collections/${collection}`) 
    const images : ImageFetchData[] = await getImagesFromFolder(`collections/${collection}/preview`) 
    shuffleInPlace(images)
    
    if (!fetched_collection) {
        return <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8">
            <div>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">Error</h1>
            </div>
        </main>
    }

    return (
    <main className="flex flex-col gap-2 lg:gap-4 mt-8 mx-4 lg:mx-8">
      <CollectionHeader
        topSep={false}
        bottomSep={true}
        collectiontTitle={"Image Gallery / " + fetched_collection.title}
        backLink="/gallery"
      />
      <div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-xl md:text-2xl xl:text-4xl">{"Grid view "}</h2>
        <a href={`${collection}/carousel`} className="text-xl md:text-2xl xl:text-4xl hover:cursor-pointer border-foreground border-2 hover:bg-primary hover:text-background hover:border-transparent px-2 rounded-xl">{"Carousel view >"}</a>
      </div>
      <ImageGallery images={images} collection_name={collection}/>
      <div className="mb-10">
        <p className="text-lg md:text-xl xl:text-2xl font-light">{"© 2025 Tobias Borning. All photographs are protected by copyright."}</p>
        <p className="text-md md:text-lg xl:text-xl font-light">{"Interested in using any of these photos? Contact me at tobias.borning@gmail.com"}</p>
      </div>
    </main>
    )
}