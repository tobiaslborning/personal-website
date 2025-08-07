import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicNavBarProps {
    topSep: boolean
    bottomSep: boolean
    selected: "home" | "projects" | "gallery" | "skills" | "about-me"
    onNavigate?: (page: "home" | "projects" | "gallery" | "skills" | "about-me") => void // Callback for navigation
}

export const DynamicNavBar: React.FC<DynamicNavBarProps> = ({ topSep, bottomSep, selected, onNavigate }) => {
    const isHome = selected === "home";

    return (
        <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
                {isHome ? (
                    // Home layout - static navbar with all pages
                    <motion.div 
                        key="home"
                        className="flex flex-col gap-4"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {topSep ? <Separator className="bg-foreground"/> : <div></div>}
                        <div className="flex flex-col md:flex-row gap-2 justify-between text-xl xl:text-2xl font-regular">
                            <a 
                                className="hover:underline cursor-pointer" 
                                onClick={() => onNavigate?.("projects")}
                            >
                                Projects
                            </a>
                            <a 
                                className="hover:underline cursor-pointer" 
                                onClick={() => onNavigate?.("gallery")}
                            >
                                Image Gallery
                            </a>
                            <a 
                                className="hover:underline cursor-pointer" 
                                onClick={() => onNavigate?.("skills")}
                            >
                                Skills
                            </a>
                            <a 
                                className="hover:underline cursor-pointer" 
                                onClick={() => onNavigate?.("about-me")}
                            >
                                About me
                            </a>
                            <div className="flex">
                                <a className="hover:underline" href="https://www.github.com/tobiaslborning">
                                    {"Github "}
                                </a>
                                <span>{"/"}</span>
                                <a className="hover:underline" href="https://www.linkedin.com/in/tobias-borning">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                        {bottomSep ? <Separator className="bg-foreground"/> : <div></div>}
                    </motion.div>
                ) : (
                    // Page header layout
                    <motion.div 
                        key="page-header"
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeIn" }}
                    >
                        {topSep ? <Separator className="bg-foreground"/> : <div></div>}
                        <div className="flex flex-col md:flex-row gap-2 justify-between text-xl xl:text-2xl font-regular">
                            <a 
                                className="hover:underline w-1/3 cursor-pointer" 
                                onClick={() => onNavigate?.("home")}
                            >
                                {"< Back"}
                            </a>
                            <p className="w-1/3 text-right pr-4">
                                {selected === "projects" ? "Projects" : 
                                 selected === "gallery" ? "Image Gallery" : 
                                 selected === "skills" ? "Skills" : 
                                 "About me"}
                            </p>
                            <div className="flex w-1/3 justify-end">
                                <a className="hover:underline" href="https://www.github.com/tobiaslborning">
                                    {"Github "}
                                </a>
                                <span>{"/"}</span>
                                <a className="hover:underline" href="https://www.linkedin.com/in/tobias-borning">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                        {bottomSep ? <Separator className="bg-foreground"/> : <div></div>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
