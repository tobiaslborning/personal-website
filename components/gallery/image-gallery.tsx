
import Image from 'next/image';
import { Separator } from '../ui/separator';

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
          {columnImages.map((img, imageIndex) => (
            <Image
              key={imageIndex}
              src={img.src}
              alt={img.alt}
              width={1000}
              height={0}
              className='rounded-sm'
              />
          ))}
        </div>
      ))}
    </div>
  );
};