"use server"

import { CollectionInfo, getCollectionsInfo } from "@/lib/actions/image_collections";

import GalleryPage from "./gallery-page";

export default async function Page() {
  const collections : CollectionInfo[] = await getCollectionsInfo() ?? []

  return (
    <GalleryPage collections={collections}/>
  )
}

