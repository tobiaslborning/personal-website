"use server"
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'

export interface CollectionInfo {
  title : string
  description : string
  path? : string
}

export async function getCollectionsInfo(folderPath: string = 'collections'): Promise<CollectionInfo[]> {
  try {
    const collections : CollectionInfo[] = []
    const collections_path= path.join(process.cwd(), 'public', folderPath);
    const all_items = fs.readdirSync(collections_path);
    
    // Filter for directories only
    const collection_folders = all_items.filter(item => {
      const itemPath = path.join(collections_path, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    for(const folderName of collection_folders) {
      const info = await getCollectionInfo(`${folderPath}/${folderName}`)
      if (!info) continue
      collections.push({
        title: info.title,
        description: info.description,
        path: folderName
      })
    }

    return collections

    return collections
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}

export async function getImagesFromFolder(folderPath: string = 'collections'): Promise<ImageFetchData[]> {
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

export async function getCollectionInfo(folderPath: string = 'collections'): Promise<CollectionInfo | undefined> {
  try {
    const infoDirectory = path.join(process.cwd(), 'public', folderPath);
    const aboutJsonPath = path.join(infoDirectory, 'about.json');

    // Check if about.json exists
    if (!fs.existsSync(aboutJsonPath)) {
      console.warn(`about.json not found in ${folderPath}`);
      return undefined;
    }
    
    // Read and parse the JSON file
    const jsonContent = fs.readFileSync(aboutJsonPath, 'utf8');
    const parsedData = JSON.parse(jsonContent);
    
    return parsedData as CollectionInfo;

  } catch (error) {
    console.error('Error reading images directory:', error);
    return undefined;
  }
}


export async function getHighResImage(highResPath : string, filename : string) : Promise<ImageFetchData> {
  const imagePath = path.join(process.cwd(), 'public', highResPath, filename);
  let width, height

  try {
    // Get image dimensions server-side
    const metadata = await sharp(imagePath).metadata();
    width = metadata.width;
    height = metadata.height;

  } catch (error) {
    console.warn(`Could not get dimensions for ${filename}:`, error);
  }
  
  return {
    src: "/"+highResPath+"/"+filename,
    alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
    name: filename,
    width: width,
    height: height,
  }
}