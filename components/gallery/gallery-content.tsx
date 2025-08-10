"use client"
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface CollectionInfo {
  title: string;
  path?: string;
}

interface GalleryContentProps {
  collections: CollectionInfo[];
}

export function GalleryContent({ collections }: GalleryContentProps) {
  return (
    <motion.div 
      className="flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      
      <div className="md:w-2/3 flex flex-col gap-4 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 lg:gap-8 mr-2"
        >
          {collections.map((collection, index) => {
            return (
              <motion.div 
                className="flex flex-col w-full gap-4" 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <div className="flex gap-3">
                  <span>
                    <a 
                      href={`/gallery/${collection.path ?? ""}`} 
                      className="text-2xl md:text-3xl xl:text-5xl font-medium hover:underline hover:cursor-pointer pr-2"
                    >
                      {collection.title}
                    </a>
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                >
                  {index < collections.length - 1 && <Separator className="bg-foreground"/>}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      
      <motion.div 
        className="hidden md:flex rounded-full w-1/3 sticky top-8 bg-primary"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
      </motion.div> 
    </motion.div>
  );
}
