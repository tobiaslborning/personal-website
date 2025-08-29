import Image from 'next/image';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { HighResImageDialogContent } from './highres-image-dialog-content';
import { getIndexOfLowest } from '@/lib/utils';
import { AnimatedImage } from './animated-image';

interface ImageGalleryProps {
  columns : ImageFetchData[][];
  collection_name : string;
  className?: string;
  imageClassName?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  columns,
  collection_name 
}) => {

  return (
    <div className="flex gap-2 mt-6 mb-16">
      {columns.map((columnImages, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-1 flex-1">
          {columnImages.map((img, imageIndex) => {
            let width = img.width ?? 1000
            let height = img.height ?? 0
          
            const image = (
              <Image
                src={img.src}
                alt={img.alt}
                width={width}
                height={height}
                placeholder='empty'
                loading='lazy'
                unoptimized={false}
              />
            )
            return (
              <Dialog key={imageIndex}>
                <DialogTrigger className='hover:cursor-pointer'>
                  {image}
                </DialogTrigger>
                <HighResImageDialogContent
                  filename={img.name.replace("-preview.webp",".webp")}
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