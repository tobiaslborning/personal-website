import fs from 'fs';
import path from 'path';

export async function getImagesFromFolder(folderPath: string = 'images'): Promise<ImageFetchData[]> {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', folderPath);
    const filenames = fs.readdirSync(imagesDirectory);
    
    const supportedFormats = /\.(jpg|jpeg|png|gif|svg|webp)$/i;
    
    return filenames
      .filter(name => supportedFormats.test(name))
      .map(name => ({
        src: `/${folderPath}/${name}`,
        alt: name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
        name: name
      }));
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}