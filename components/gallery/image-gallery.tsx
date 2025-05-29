import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ImageGalleryProps {
  images: ImageFetchData[];
  className?: string;
  imageClassName?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
}) => {
  // Distribute images into 3 columns
  const columns = [[], [], []] as typeof images[];
  
  images.forEach((img, index) => {
    columns[index % 3].push(img);
  });


  return (
    <div className="flex gap-2 mt-6 mb-16">
      {columns.map((columnImages, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-2 flex-1">
          {columnImages.map((img, imageIndex) => {
            const image = <Image
            src={img.src}
            alt={img.alt}
            width={img.width ?? 1000}
            height={img.height ?? 0}
            unoptimized
            className='rounded-sm'
            />
            return (
              <Dialog key={imageIndex}>
                <DialogTrigger className='hover:cursor-pointer'>
                  {image}
                </DialogTrigger>
                <DialogContent className='md:max-w-3xl xl:max-w-4xl max-h-screen mt-2 overflow-scroll'>
                  <DialogTitle>
                    {img.name}
                  </DialogTitle>
                  <div className='flex flex-col max-h-screen'>
                    {image}
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      ))}
    </div>
  );
};