"use server"
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'

export async function getImagesFromFolder(folderPath: string = 'images'): Promise<ImageFetchData[]> {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', folderPath);
    const filenames = fs.readdirSync(imagesDirectory);
    
    const supportedFormats = /\.(jpg|jpeg|png|gif|svg|webp)$/i;
    
    const imagePromises = filenames
      .filter(name => supportedFormats.test(name))
      .map(async name => {
        const imagePath = path.join(imagesDirectory, name);
        let width, height;
        
        try {
          // Get image dimensions server-side
          const metadata = await sharp(imagePath).metadata();
          width = metadata.width;
          height = metadata.height;

        } catch (error) {
          console.warn(`Could not get dimensions for ${name}:`, error);
        }

        
        return {
          src: `/${folderPath}/${name}`,
          alt: name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
          name: name,
          width: width,
          height: height,
        }
      });

    return await Promise.all(imagePromises)
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}