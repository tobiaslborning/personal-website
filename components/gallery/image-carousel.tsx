"use client"
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageCarouselProps {
  images: ImageFetchData[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openFullscreen = (index: number) => {
    setSelectedImage(index);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Images */}
        <div className="flex gap-4 overflow-x-auto h-[90vh]">
          {images.map((image, index) => (
          <motion.div
              key={index}
              className="flex-shrink-0 h-full relative group cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              onClick={() => openFullscreen(index)}
          >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading='lazy'
                className={`object-contain w-auto h-full`}
              />
              <div className="absolute top-0 right-0 z-10 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-background text-lg">
                <div className='bg-primary px-2 w-fit'>{image.model}</div>
                <div className='bg-primary px-2 w-fit'>{image.lensModel}</div>
                <div className='bg-primary px-2 w-fit'>F{image.fstop} : {image.exposureTime}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-background z-50 flex items-center justify-center"
        >
          <div className="relative w-full mx-4 max-h-[95vh] overflow-scroll">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width}
              height={images[selectedImage].height}
              className="object-contain w-auto h-auto max-w-full max-h-full"
            />
            <button 
              className="absolute top-4 right-4 text-background hover:text-primary hover:cursor-pointer hover:bg-background bg-primary px-2 rounded-xl text-2xl hover:opacity-70"
              onClick={closeFullscreen}
            >
              <p className='-translate-y-0.5'>x</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};