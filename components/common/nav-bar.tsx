import { Separator } from "../ui/separator";
import { GradientCanvas } from "../ui/gradient-canvas";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface NavBarProps {
    topSep: boolean
    bottomSep: boolean
    selected: "home" | "projects" | "gallery" | "skills" | "about-me"
    isPageHeader?: boolean // New prop to determine if it should animate to back button layout
    animate?: boolean // New prop to control if the transition should be animated
    onNavigate?: (page: "home" | "projects" | "gallery" | "skills" | "about-me") => void // Callback for navigation
}

export const NavBar: React.FC<NavBarProps> = ({ topSep, bottomSep, selected, isPageHeader = false, animate = true, onNavigate }) => {
    // If animate is false, start directly with the correct layout
    const [showInitialLayout, setShowInitialLayout] = useState(!isPageHeader || (isPageHeader && !animate ? false : true));

    useEffect(() => {
        if (isPageHeader && animate) {
            // Start with normal layout, then animate to back button layout
            const timer = setTimeout(() => {
                setShowInitialLayout(false);
            }, 500); // Show initial layout for 500ms before transitioning
            
            return () => clearTimeout(timer);
        }
    }, [isPageHeader, animate]);

    return  <div className="flex flex-col gap-4">
        {topSep && <Separator className="bg-foreground"/>}
        {/* Navigation links */}
        <div className="flex flex-col md:flex-row gap-2 justify-between text-xl xl:text-2xl font-regular">
            <AnimatePresence mode="wait">
                {showInitialLayout ? (
                    // Initial normal navbar layout (without home)
                    <motion.div 
                        key="normal"
                        className="flex flex-col md:flex-row gap-2 justify-between w-full"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.a 
                            className={`hover:underline cursor-pointer ${selected === "projects" ? "font-semibold italic" : ""}`} 
                            onClick={() => onNavigate?.("projects")}
                            layout
                        >
                            Projects
                        </motion.a>
                        <motion.a 
                            className={`hover:underline cursor-pointer ${selected === "gallery" ? "font-semibold italic" : ""}`} 
                            onClick={() => onNavigate?.("gallery")}
                            layout
                        >
                            Image Gallery
                        </motion.a>
                        <motion.a 
                            className={`hover:underline cursor-pointer ${selected === "skills" ? "font-semibold italic" : ""}`} 
                            onClick={() => onNavigate?.("skills")}
                            layout
                        >
                            Skills
                        </motion.a>
                        <motion.a 
                            className={`hover:underline cursor-pointer ${selected === "about-me" ? "font-semibold italic" : ""}`} 
                            onClick={() => onNavigate?.("about-me")}
                            layout
                        >
                            About me
                        </motion.a>
                        <motion.div className="flex" layout>
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
                    // Back button layout (current state)
                    <motion.div 
                        key="back"
                        className="flex flex-col md:flex-row gap-2 justify-between w-full"
                        initial={animate ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={animate ? { duration: 0.4, ease: "easeOut" } : { duration: 0 }}
                    >
                        <motion.a 
                            className="hover:underline w-1/3 cursor-pointer" 
                            onClick={() => onNavigate?.("home")}
                            initial={animate ? { x: -20, opacity: 0 } : { x: 0, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={animate ? { delay: 0.1 } : { duration: 0 }}
                        >
                            {"< Back"}
                        </motion.a>
                        <motion.p 
                            className={`w-1/3 text-right pr-4 ${selected === "about-me" ? "font-semibold text-primary" : ""}`}
                            initial={animate ? { y: -10, opacity: 0 } : { y: 0, opacity: 1 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={animate ? { delay: 0.2 } : { duration: 0 }}
                        >
                            {selected === "projects" ? "Projects" : 
                             selected === "gallery" ? "Image Gallery" : 
                             selected === "skills" ? "Skills" : 
                             "About me"}
                        </motion.p>
                        <motion.div 
                            className="flex w-1/3 justify-end"
                            initial={animate ? { x: 20, opacity: 0 } : { x: 0, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={animate ? { delay: 0.3 } : { duration: 0 }}
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
            </AnimatePresence>
        </div>
        {bottomSep && <Separator className="bg-foreground"/>}
    </div>
}