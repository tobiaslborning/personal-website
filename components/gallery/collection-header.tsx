"use client"
import { Separator } from "../ui/separator";

interface CollectionHeaderProps {
    topSep: boolean
    bottomSep: boolean
    collectiontTitle: string
    backLink: string
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({ topSep, bottomSep, collectiontTitle, backLink }) => {
    return (
        <div className="flex flex-col gap-4">
            {topSep ? <Separator className="bg-foreground"/> : <div></div>}
            {/* Static page header layout */}
            <div className="flex flex-col md:flex-row gap-2 justify-between text-xl xl:text-2xl font-regular">
                <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
                    <a 
                        className="hover:underline w-1/3 cursor-pointer" 
                        href={backLink}
                    >
                        {"< Back"}
                    </a>
                    <p className="w-1/3 text-right pr-4">
                        {collectiontTitle}
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
