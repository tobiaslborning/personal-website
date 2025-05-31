"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHighResImage } from '@/lib/actions/image_collections';
import { Separator } from '../ui/separator';

interface ImageCarouselProps {
  images: ImageFetchData[];
  collection_name: string;
  className?: string;
  imageClassName?: string;
}


export const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images,
  collection_name 
}) => {
    const image_filenames = images.map(i => i.name.replace(" Large.jpeg",".jpg"))
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loadedImages, setLoadedImages] = useState<{ [key: number]: ImageFetchData }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Function to load a single image
    const loadImage = async (index: number) => {
        if (index < 0 || index >= image_filenames.length) return;
        if (loadedImages[index]) return; // Check if this specific index is already loaded

        try {
            const filename = image_filenames[index];
            const image_data = await getHighResImage(`collections/${collection_name}/high-res`, filename);
            console.log(image_data)
            // Update state correctly without mutation
            setLoadedImages(prev => ({
                ...prev,
                [index]: image_data
            }));
        } catch (error) {
            console.error(`Failed to load image at index ${index}:`, error);
        }
    };

    // Function to load images around current index
    const loadImagesAroundIndex = async (centerIndex: number) => {
        setIsLoading(true);
        
        // Load current image and 2 ahead
        const indicesToLoad = [
            centerIndex,
            centerIndex + 1,
            centerIndex + 2
        ].filter(i => i >= 0 && i < image_filenames.length);

        await Promise.all(indicesToLoad.map(loadImage));
        setIsLoading(false);
    };

    // Load initial images on mount
    useEffect(() => {
        loadImagesAroundIndex(currentIndex);
    }, []);

    // Load more images when currentIndex changes
    useEffect(() => {
        loadImagesAroundIndex(currentIndex);
    }, [currentIndex]);

    // Navigation functions
    const goToNext = () => {
        if (currentIndex < image_filenames.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="flex gap-4 flex-col">
            <div className='flex flex-col gap-2 py-1 sticky top-0 bg-background'>
                <div className='flex gap-4'>
                    {/* Previous button */}
                    <button 
                        onClick={goToPrevious} 
                        disabled={currentIndex === 0}
                        className="
                            disabled:opacity-50 hover:underline hover:cursor-pointer
                            text-xl md:text-2xl xl:text-4xl
                        "
                    >
                        {"< Prev"}
                    </button>
                    {/* Next button */}
                    <button 
                        onClick={goToNext} 
                        disabled={currentIndex === image_filenames.length - 1}
                        className="
                            disabled:opacity-50 hover:underline hover:cursor-pointer 
                            text-xl md:text-2xl xl:text-4xl
                        "
                    >
                        {"Next >"}
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
                <Separator className='bg-foreground'/>
                {loadedImages[currentIndex] && (
                    <div className="flex flex-wrap gap-2 text-xl md:text-2xl xl:text-4xl">
                    <p>{loadedImages[currentIndex].make  ?? ""} {(loadedImages[currentIndex].model ?? "").replace(loadedImages[currentIndex].make ?? "", "")}</p>
                    <p>{">"}</p>
                    <p>{loadedImages[currentIndex].lensMake ?? ""} {(loadedImages[currentIndex].lensModel ?? "").replace(loadedImages[currentIndex].lensMake ?? "", "")}</p>
                    <p>{">"}</p>
                    <p>F{loadedImages[currentIndex].fstop} : {loadedImages[currentIndex].exposureTime}</p>
                </div>)}
                <Separator className='bg-foreground'/>
            </div>
            {/* Current image */}
            <div className="h-[90vh] w-full"> 
                {loadedImages[currentIndex] ? (
                    <Image
                        src={loadedImages[currentIndex].src}
                        alt={loadedImages[currentIndex].alt}
                        width={loadedImages[currentIndex].width || 1000}
                        height={loadedImages[currentIndex].height || 800}
                        priority
                        className="object-contain w-full h-full max-h-[90vh] object-left-top"
                    />
                ) : (
                    <div className="w-full h-[90vh] bg-gray-200 animate-pulse rounded" />
                )}
            </div>
            {/* Loading indicator */}
            {isLoading && (
            <div className="absolute top-2 right-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            )}
            
        </div>
    );
};