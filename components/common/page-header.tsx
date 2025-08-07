"use client"
import { Separator } from "../ui/separator";

interface PageHeaderProps {
    topSep: boolean
    bottomSep: boolean
    selected: "projects" | "gallery" | "skills" | "about-me"
    onBack?: () => void // Optional callback for back button
}

export const PageHeader: React.FC<PageHeaderProps> = ({ topSep, bottomSep, selected, onBack }) => {
    const handleBackClick = () => {
        if (onBack) {
            onBack();
        } else {
            // Default behavior - navigate to home
            window.location.href = '/';
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {topSep ? <Separator className="bg-foreground"/> : <div></div>}
            {/* Static page header layout */}
            <div className="flex flex-col md:flex-row gap-2 justify-between text-xl xl:text-2xl font-regular">
                <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
                    <a 
                        className="hover:underline w-1/3 cursor-pointer" 
                        onClick={handleBackClick}
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
            </div>
            {bottomSep ? <Separator className="bg-foreground"/>  : <div></div>}
        </div>
    );
};
