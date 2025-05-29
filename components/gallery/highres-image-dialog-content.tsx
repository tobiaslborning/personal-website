import { getHighResImage } from "@/lib/actions/image_collections"
import { DialogContent, DialogTitle } from "../ui/dialog"
import Image from "next/image"

interface HighResImageDialogProps {
  filename : string
  collection_name : string
}

export async function HighResImageDialogContent({filename, collection_name } : HighResImageDialogProps) { 
    const image = await getHighResImage(`collections/${collection_name}/high-res`, filename)

    // Calculate aspect ratio to determine layout
    const aspectRatio = image.width && image.height ? image.width / image.height : 1;
    const isLandscape = aspectRatio > 1;

    return (
        <DialogContent className={`
            ${isLandscape 
                ? 'md:max-w-5xl xl:max-w-6xl' 
                : 'md:max-w-2xl xl:max-w-3xl'
            } 
            max-h-[90vh] flex flex-col mt-2 overflow-hidden
        `}>
            <DialogTitle className="text-lg font-medium mb-2">
                {image.alt}
            </DialogTitle>
            <div className='flex-1 flex items-center justify-center overflow-hidden'>
                <div className='relative w-full h-full flex items-center justify-center'>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width || 1000}
                        height={image.height || 800}
                        className={`
                            object-contain w-full h-full
                            ${isLandscape 
                                ? 'max-h-[80vh]' 
                                : 'max-h-[85vh] max-w-full'
                            }
                        `}
                        priority
                    />
                </div>
            </div>
        </DialogContent>
    )
}