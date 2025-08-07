"use server"
import { PageHeader } from "@/components/common/page-header";
import { Separator } from "@/components/ui/separator";
import { CollectionInfo, getCollectionsInfo } from "@/lib/actions/image_collections";
import { GalleryContent } from "@/components/gallery/gallery-content";

export default async function Page() {
  const collections : CollectionInfo[] = await getCollectionsInfo() ?? []

  return (
    <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8 mb-16">
      <PageHeader
        topSep={false}
        bottomSep={true}
        selected="gallery"
      />
      
      <GalleryContent collections={collections} />
    </main>
  )
}

