"use client"

import Image from 'next/image';
import { easeOut, motion } from 'framer-motion';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  width,
  height,
  index
}) => {
  return (

    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={false}
      loading="lazy"
      className='rounded-sm hover:border-primary border-background border-2 transition-all duration-200'
    />

  );
};