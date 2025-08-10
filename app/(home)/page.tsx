"use client"

import { GradientCanvas } from "@/components/ui/gradient-canvas";
import { useState } from "react";
import { NavBarHeader } from "@/components/common/nav-bar-header";
import { PageContent } from "@/components/common/page-content";

export default function Page() {
  const [morphing, setMorphing] = useState<boolean>(false)

  return (
    <main className="h-screen overflow-hidden mx-4 md:mx-8"> 
      <NavBarHeader
        selected="home"
        setMorphing={setMorphing}
      />
      <PageContent
        morphing={morphing}
        className=""
      >
        <div
          className="
          mb-8 overflow-hidden rounded-lg  
          xl:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-216px)]
          md:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-174px)]
          md:block hidden
          "
          >
          <GradientCanvas 
            containerClassName="w-full h-full"
            />
        </div>
      </PageContent>
    </main>
  )
}

