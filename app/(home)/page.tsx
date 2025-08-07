"use client"
import { DynamicNavBar } from "@/components/common/dynamic-nav-bar";
import { GradientCanvas } from "@/components/ui/gradient-canvas";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { Separator } from "@radix-ui/react-separator";
import { useRouter } from "next/navigation";

export default function Page() {
  const [clicked, setClicked] = useState<boolean>(false)
  const [selected, setSelected] = useState<"home" | "projects" | "gallery" | "skills" | "about-me">("home")
  const router = useRouter()

  const handleNavigate = (page: "home" | "projects" | "gallery" | "skills" | "about-me") => {
    if (page === "home") {
      setClicked(false)
      setSelected("home")
    } else {
      setClicked(true)
      setSelected(page)
      
      // Navigate to the actual page after animations
      setTimeout(() => {
        router.push(`/${page}`)
      }, 950) // Wait for animations to complete
    }
  }

  return (
    <main className="h-screen overflow-hidden"> 
      <div className="flex flex-col mt-8 mx-4 md:mx-8">
      <AnimatePresence>
        {!clicked && <motion.div
          initial={{ opacity: 1, height:"auto" }}
          exit={{ 
            opacity: 0, 
            height: 0,
            transition: { 
              opacity: { duration: 0.25, ease: "easeOut" },
              height: { duration: 0.5, delay: 0.5, ease: "easeInOut" }
            }
          }}
        >
          <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
            <span>{"Hi, I'm "}</span>
            <span className="hover:italic cursor-pointer" onClick={() => handleNavigate("projects")}>{"Tobias"}</span>
          </div>
          <div className="text-2xl md:text-3xl xl:text-5xl font-regular mb-4">
            <p>{"CS Student & AI/ML Engineer"}</p> 
            {/* <p>{"I write code, take photos and build things."}</p> */}
          </div>
        </motion.div>}
      </AnimatePresence>
      <DynamicNavBar
        topSep={!clicked}
        bottomSep={false}
        selected={selected}
        onNavigate={handleNavigate}
      />
      </div>
      <AnimatePresence>
        {!clicked && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { 
              opacity: { duration: 0.45, delay: 0, ease: "easeOut" },
            }
          }}
          transition={{ 
            opacity: { duration: 1, ease: "easeIn" }
          }}
          className="
            mx-4 md:mx-8 mb-8 overflow-hidden rounded-lg  
            xl:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-216px)]
            md:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-174px)]
            md:block hidden
          "
        >
          <GradientCanvas 
            containerClassName="w-full h-full"
          />
        </motion.div>}
      </AnimatePresence>
    </main>
  )
}

