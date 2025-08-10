"use client"

import { AnimatePresence, motion } from "framer-motion"

interface PageContentProps {
    morphing : boolean
    children : React.ReactNode
    className? : string
    flexDirection? : "row" | "col"
}

export const PageContent: React.FC<PageContentProps> = ({morphing, children, className, flexDirection}) => {
    return <AnimatePresence>
        {!morphing && <motion.div
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
          className={className ?? `flex flex-${flexDirection ?? "col"} gap-4 lg:gap-8 mt-4 lg:mt-8`}
          >
            {children}
        </motion.div>}
    </AnimatePresence>
}