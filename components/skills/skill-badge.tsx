import { Badge } from "../ui/badge";
import { IconType } from "react-icons/lib";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription  } from "../ui/dialog";
;


interface SkillBadgeProps {
  name: string;
  description?: string;
  icon?: IconType;
  compact?: boolean
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  name,
  description,
  compact,
  icon: Icon 
}) => {
    return <>
      <Dialog>
        <DialogTrigger>
          { 
          compact ? 
          <div>
              {Icon && <Icon className="size-3 md:size-5 hover:cursor-pointer hover:-translate-y-0.5"/>}
          </div>
          :
          <div className="px-3 md:px-6 py-2 md:py-4 w-fit rounded-4xl font-regular flex border-foreground border-1 hover:bg-primary hover:text-background hover:cursor-pointer">
              {Icon && <Icon className="size-4 md:size-8 mr-2"/>} {/* Render the icon */}
              <h3 className="text-sm md:text-lg xl:text-xl -mt-[0.5px] md:mt-[3px]">{name}</h3>
          </div>
          }
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <div className="font-regular flex">
              <h3 className="text-2xl mt-[3px] mr-2">{name}</h3>
              {Icon && <Icon className="size-8"/>} {/* Render the icon */}
            </div>
          </DialogTitle>
          <DialogDescription className="text-lg font-light">{description}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
}

