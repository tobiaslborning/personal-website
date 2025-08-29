
"use server"
import { CollectionHeader } from "@/components/gallery/collection-header"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { CollectionInfo, getImagesFromFolder, getCollectionInfo } from "@/lib/actions/image_collections"
import { getIndexOfLowest, shuffleInPlace } from "@/lib/utils"
import { headers } from 'next/headers';
import MobileDetect from "mobile-detect"

interface PageProps {
  params: Promise<{
      collection: string
  }>
}



// In your server action
function getImagesInColumns(numColumns : number, images : ImageFetchData[]): ImageFetchData[][] {
  
  // Distribute into columns server-side
  const columns = Array.from({ length: numColumns }, () => []) as ImageFetchData[][];
  const columnHeights = new Array(numColumns).fill(0);

  images.forEach((img) => {
    const index = getIndexOfLowest(columnHeights);
    columns[index].push(img);
    columnHeights[index] += img.height ?? 1500;
  });

  return columns;
}

export default async function Page({ params } : PageProps ) {
    const { collection } = await params
    // Start mobile detection
    const userAgent = (await headers()).get('user-agent') || '';
    const md = new MobileDetect(userAgent);
    const isMobile = md.mobile() !== null;

    const fetched_collection : CollectionInfo | undefined = await getCollectionInfo(`collections/${collection}`) 
    
    if (!fetched_collection) {
        return <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8">
            <div>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">Error</h1>
            </div>
        </main>
    }

    const images : ImageFetchData[] = await getImagesFromFolder(`collections/${collection}/preview`) 
    shuffleInPlace(images)
    const columns = await getImagesInColumns(isMobile ? 1 : 3,images)

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
      {!isMobile && <div className="flex justify-end">
          <a href={`${collection}/carousel`} className="text-xl md:text-2xl xl:text-4xl hover:cursor-pointer border-foreground border-2 hover:bg-primary hover:text-background hover:border-transparent px-2 rounded-xl">{"Carousel view >"}</a>
      </div>}
      <ImageGallery columns={columns} collection_name={collection}/>
      <div className="mb-10">
        <p className="text-lg md:text-xl xl:text-2xl font-light">{"© 2025 Tobias Borning. All photographs are protected by copyright."}</p>
        <p className="text-md md:text-lg xl:text-xl font-light">{"Interested in using any of these photos? Contact me at tobias.borning@gmail.com"}</p>
      </div>
    </main>
    )
}