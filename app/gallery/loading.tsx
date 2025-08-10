"use client"

import { NavBarHeader } from "@/components/common/nav-bar-header"

export default function Loading() {
  
  return (
    <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8 mb-16">
      <NavBarHeader
          selected="gallery"
      />
      
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col items-center justify-center py-16 mr-2">
          {/* Simple loading spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading galleries...</p>
        </div>
      </div>
     
    </main>
  )
}