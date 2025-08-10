"use client"
import { Separator } from "../ui/separator";
import { GradientCanvas } from "../ui/gradient-canvas";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NavBarHeaderProps {
    selected: "home" | "projects" | "gallery" | "skills" | "about-me",
    setMorphing?: (morphing : boolean) => void
    navigateTimeout?: number
}

const HeroTitle : React.FC = () => {
    return <>
        <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
            <span>{"Hi, I'm "}</span>
            <span className="hover:italic">{"Tobias"}</span>
        </div>
            <div className="text-2xl md:text-3xl xl:text-5xl font-regular">
            <p>{"CS Student & AI/ML Engineer"}</p> 
        </div>
    </>
}

export const NavBarHeader: React.FC<NavBarHeaderProps> = ({ selected, navigateTimeout, setMorphing }) => {
    const router = useRouter()
    const [animateIn, setAnimateIn] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<string>(selected)

    const navigate = (page : string) => {
        setAnimateIn(true)
        setCurrentPage(page)
        setMorphing?.(true)
        let navPage = page
        if (navPage === "home") {
            navPage = ""
        }
        // Navigate to the actual page after animations
        setTimeout(() => {
            router.push(`/${navPage}`)
        }, navigateTimeout ?? 950) // Wait for animations to complete
    }
    return   <motion.div
        initial={{ 
            marginTop: currentPage === "home" ? "2rem" : 0, 
        }}
        animate={{ 
            marginTop: currentPage === "home" ? "2rem" : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${currentPage !== "home" ? "sticky top-0 bg-background" : ""}`}
    >
        <AnimatePresence>
        {currentPage === "home" && !animateIn && <motion.div
          initial={{ opacity: 1, height: "auto" }}
          exit={{ 
            opacity: 0, 
            height: 0,
            transition: { 
              opacity: { duration: 0.25, ease: "easeOut" },
              height: { duration: 0.5, delay: 0.5, ease: "easeInOut" }
            }
          }}
          transition={animateIn ? {
            opacity: { duration: 0.4, ease: "easeOut" },
            height: { duration: 0.5, ease: "easeInOut" }
          } : {}}
          key="home-header"
        >
            <HeroTitle/>
        </motion.div>}
        {currentPage === "home" && animateIn && <motion.div
            initial={{ opacity: 0, height: 0}}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ 
                height: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.5, delay: 0.5, ease: "easeInOut"}
            }}
            key="back-to-home-expand"
        >
            <HeroTitle/>
        </motion.div>}
        <div className={`flex flex-col ${currentPage !== "home" ? "sticky top-8" : ""}`}>
            <motion.div
                initial={{ opacity: currentPage === "home" ? (animateIn ? 0 : 1) : 0 }}
                animate={{ 
                    opacity: currentPage === "home" ? 1 : 0 
                }}
                transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                }}
                className="my-4"
            >
                <Separator className="bg-foreground"/>
            </motion.div> 
                <div className="flex flex-col md:flex-row justify-between text-xl xl:text-2xl font-regular">
                {currentPage === "home" ? (
                <motion.div 
                    key="home"
                    className="flex flex-col md:flex-row gap-2 justify-between w-full"
                    initial={{ opacity: animateIn ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: animateIn ? 0.3 : 0 }}
                >
                    <motion.a 
                        className={`hover:underline cursor-pointer`} 
                        onClick={() => navigate("projects")}
                        initial={animateIn ? { x: -20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.1, duration: 0.3 } : {}}
                        layout
                    >
                        Projects
                    </motion.a>
                    <motion.a 
                        className={`hover:underline cursor-pointer`} 
                        onClick={() => navigate("gallery")}
                        initial={animateIn ? { x: -20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.15, duration: 0.3 } : {}}
                        layout
                    >
                        Image Gallery
                    </motion.a>
                    <motion.a 
                        className={`hover:underline cursor-pointer`} 
                        onClick={() => navigate("skills")}
                        initial={animateIn ? { x: -20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.2, duration: 0.3 } : {}}
                        layout
                    >
                        Skills
                    </motion.a>
                    <motion.a 
                        className={`hover:underline cursor-pointer`} 
                        onClick={() => navigate("about-me")}
                        initial={animateIn ? { x: -20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.25, duration: 0.3 } : {}}
                        layout
                    >
                        About me
                    </motion.a>
                    <motion.div 
                        className="flex" 
                        initial={animateIn ? { x: 20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.3, duration: 0.3 } : {}}
                        layout
                    >
                        <a className="hover:underline" href="https://www.github.com/tobiaslborning">
                            {"Github "}
                        </a>
                        <span>{"/"}</span>
                        <a className="hover:underline" href="https://www.linkedin.com/in/tobias-borning">
                            LinkedIn
                        </a>
                    </motion.div>
                </motion.div>
                ) : (
                <motion.div 
                    key="back"
                    className="flex flex-row gap-2 justify-between w-full"
                    initial={{ opacity: animateIn ? 0 : 1, scale: animateIn ? 1.05 : 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: animateIn ? 0.4 : 0, ease: "easeOut" }}
                >
                    <motion.a 
                        className="hover:underline w-1/2 md:w-1/3 cursor-pointer" 
                        onClick={() => navigate("home")}
                        initial={animateIn ? { x: -20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.1, duration: 0.3 } : {}}
                    >
                        {"< Back"}
                    </motion.a>
                    <motion.p 
                        className={"w-1/2 md:w-1/3 text-right italic pr-4"}
                        initial={animateIn ? { y: -10, opacity: 0 } : {}}
                        animate={{ y: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.2, duration: 0.3 } : {}}
                    >
                        {
                            currentPage === "projects" ? "Projects" : 
                            currentPage === "gallery" ? "Image Gallery" : 
                            currentPage === "skills" ? "Skills" : 
                            "About me"
                        }
                    </motion.p>
                    <motion.div 
                        className="hidden md:flex w-1/3 justify-end"
                        initial={animateIn ? { x: 20, opacity: 0 } : {}}
                        animate={{ x: 0, opacity: 1 }}
                        transition={animateIn ? { delay: 0.3, duration: 0.3 } : {}}
                    >
                        <a className="hover:underline" href="https://www.github.com/tobiaslborning">
                            {"Github "}
                        </a>
                        <span>{"/"}</span>
                        <a className="hover:underline" href="https://www.linkedin.com/in/tobias-borning">
                            LinkedIn
                        </a>
                    </motion.div>
                </motion.div>
                )}
                </div>
            <motion.div
                initial={{ opacity: currentPage === "home" ? (animateIn ? 1 : 0) : 1 }}
                animate={{ 
                    opacity: currentPage === "home" ? 0 : 1
                }}
                transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                }}
                className="mt-4"
            >
                <Separator className="bg-foreground"/>
            </motion.div> 
        </div>
        </AnimatePresence>
    </motion.div>
}