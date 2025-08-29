import { getHighResImage } from "@/lib/actions/image_collections"
import { DialogContent, DialogTitle } from "../ui/dialog"
import Image from "next/image"

interface HighResImageDialogProps {
  filename : string
  collection_name : string
}

export async function HighResImageDialogContent({filename, collection_name } : HighResImageDialogProps) { 
    const image : ImageFetchData = await getHighResImage(`collections/${collection_name}/high-res`, filename)

    // Calculate aspect ratio to determine layout
    const aspectRatio = image.width && image.height ? image.width / image.height : 1;
    const isLandscape = aspectRatio > 1;

    return (
        <DialogContent className={`
            ${isLandscape 
                ? 'md:max-w-5xl xl:max-w-6xl' 
                : 'md:max-w-2xl xl:max-w-3xl'
            } 
            max-h-[95vh] flex flex-col overflow-hidden p-2
        `}>
            <DialogTitle className="text-lg font-medium mx-auto mt-2" asChild>
                <div className="flex flex-wrap gap-2 text-xs md:text-lg xl:text-xl">
                    <p>{image.make  ?? ""} {(image.model ?? "").replace(image.make ?? "", "")}</p>
                    <p>{">"}</p>
                    <p>{image.lensMake ?? ""} {(image.lensModel ?? "").replace(image.lensMake ?? "", "")}</p>
                    <p>{">"}</p>
                    <p>F{image.fstop} : {image.exposureTime}</p>
                </div>
            </DialogTitle>
            <div className='flex-1 flex items-center justify-center overflow-hidden rounded-sm relative min-h-[400px]'>
                {/* Loading spinner - centered in the container */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-sm text-muted-foreground">Loading image...</p>
                    </div>
                </div>
                
                {/* Image container */}
                <div className='relative w-full h-full flex items-center justify-center'>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width || 1000}
                        height={image.height || 800}
                        className={`
                            relative z-10 bg-background object-contain w-full h-full
                            ${isLandscape 
                                ? 'max-h-[80vh]' 
                                : 'max-h-[85vh] max-w-full'
                            }
                        `}
                        priority
                        sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, 1200px"
                    />
                </div>
            </div>
        </DialogContent>
    )
}