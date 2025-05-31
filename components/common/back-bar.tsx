import { Separator } from "../ui/separator";

interface BackBarProps {
    href? : string
}

export const BackBar: React.FC<BackBarProps> = ({href}) => {
    return  <div className="flex flex-col gap-2 lg:gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-lg md:text-xl xl:text-3xl w-fit pr-2" href={href ?? "/"}>{"< Back"}</a>
        <Separator className="bg-foreground"/>
    </div>
}