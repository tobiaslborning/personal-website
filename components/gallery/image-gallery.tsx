import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { HighResImageDialogContent } from './highres-image-dialog-content';
import { getIndexOfLowest } from '@/lib/utils';

interface ImageGalleryProps {
  images: ImageFetchData[];
  collection_name : string,
  className?: string;
  imageClassName?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images,
  collection_name 
}) => {
  // Distribute images into 3 columns
  const columns = [[], [], []] as typeof images[];
  const columnHeights = [0,0,0]

  images.forEach((img) => {
    const index = getIndexOfLowest(columnHeights)
    columns[index].push(img);
    columnHeights[index] += img.height ?? 1500 // 1500 is an estimated average 
  });


  return (
    <div className="flex gap-2 mt-6 mb-16">
      {columns.map((columnImages, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-1 flex-1">
          {columnImages.map((img, imageIndex) => {
            const image = <Image
            src={img.src}
            alt={img.alt}
            width={img.width ?? 1000}
            height={img.height ?? 0}
            unoptimized
            className='rounded-sm hover:border-primary border-background border-2'
            />
            return (
              <Dialog key={imageIndex}>
                <DialogTrigger className='hover:cursor-pointer'>
                  {image}
                </DialogTrigger>
                <HighResImageDialogContent
                  filename={img.name.replace(" Large.jpeg",".jpg")}
                  collection_name={collection_name}
                />
              </Dialog>
            )
          })}
        </div>
      ))}
    </div>
  );
};