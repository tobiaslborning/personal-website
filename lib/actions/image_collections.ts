"use server"
import fs from 'fs';
import path from 'path';

export interface CollectionInfo {
  title: string
  description: string
  priority: number
  path?: string
}


// Load the manifest file
function loadManifest() {
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'images-manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(manifestContent);
  } catch (error) {
    console.error('Error loading manifest:', error);
    return {};
  }
}

export async function getCollectionsInfo(folderPath: string = 'collections'): Promise<CollectionInfo[]> {
  try {
    const collections: CollectionInfo[] = []
    const manifest = loadManifest();
    
    // Get collection names from manifest
    const collectionNames = Object.keys(manifest);
    
    for (const folderName of collectionNames) {
      const info = await getCollectionInfo(`${folderPath}/${folderName}`)
      if (!info) continue
      collections.push({
        title: info.title,
        description: info.description,
        priority: info.priority,
        path: folderName
      })
    }
    collections.sort((a, b) => b.priority - a.priority)
    return collections

  } catch (error) {
    console.error('Error reading collections from manifest:', error);
    return [];
  }
}

export async function getImagesFromFolder(folderPath: string = 'collections'): Promise<ImageFetchData[]> {
  try {
    const manifest = loadManifest();
    
    // Parse the folder path to get collection and subfolder
    const pathParts = folderPath.split('/');
    let currentLevel = manifest;
    
    // Navigate through the manifest structure
    for (const part of pathParts) {
      if (part === 'collections') continue; // Skip the root 'collections' part
      if (currentLevel[part]) {
        currentLevel = currentLevel[part];
      } else {
        console.warn(`Path not found in manifest: ${folderPath}`);
        return [];
      }
    }
    
    const images: ImageFetchData[] = [];
    
    // Extract images from current level
    for (const [key, value] of Object.entries(currentLevel)) {
      // Check if this is an image object (has url property)
      if (typeof value === 'object' && value !== null && 'url' in value) {
        const imageData = value as any;
        images.push({
          src: imageData.url,
          alt: imageData.filename?.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ') || key,
          name: imageData.filename || key,
          width: imageData.width,
          height: imageData.height,
          make: imageData.exif?.make,
          model: imageData.exif?.model,
          lensMake: imageData.exif?.lensMake,
          lensModel: imageData.exif?.lensModel,
          fstop: imageData.exif?.fstop,
          exposureTime: imageData.exif?.exposureTime
        });
      }
    }
    
    return images;
  } catch (error) {
    console.error('Error reading images from manifest:', error);
    return [];
  }
}

export async function getCollectionInfo(folderPath: string = 'collections'): Promise<CollectionInfo | undefined> {
  try {
    const manifest = loadManifest();
    
    // Parse the folder path to navigate through manifest
    const pathParts = folderPath.split('/').filter(part => part !== '');
    let currentLevel = manifest;
    
    // Navigate through the manifest structure
    for (const part of pathParts) {
      if (part === 'collections') continue; // Skip the root 'collections' part
      if (currentLevel[part]) {
        currentLevel = currentLevel[part];
      } else {
        console.warn(`Collection not found in manifest: ${folderPath}`);
        return undefined;
      }
    }
    
    // Look for the _about object
    if (currentLevel._about) {
      return currentLevel._about as CollectionInfo;
    }
    
    console.warn(`about.json data not found in manifest for ${folderPath}`);
    return undefined;

  } catch (error) {
    console.error('Error reading collection info from manifest:', error);
    return undefined;
  }
}

export async function getHighResImage(highResPath: string, filename: string): Promise<ImageFetchData> {
  try {
    const manifest = loadManifest();
    
    // Parse the path to navigate through manifest
    // highResPath is like "collections/fontainebleu/high-res"
    const pathParts = highResPath.split('/').filter(part => part !== '');
    let currentLevel = manifest;
    
    // Navigate through the manifest structure
    for (const part of pathParts) {
      if (part === 'collections') continue; // Skip the root 'collections' part
      if (currentLevel[part]) {
        currentLevel = currentLevel[part];
      } else {
        throw new Error(`Path not found in manifest: ${highResPath}`);
      }
    }
    
    // Find the specific image
    const imageData = currentLevel[filename];
    
    if (!imageData || typeof imageData !== 'object' || !('url' in imageData)) {
      throw new Error(`Image not found in manifest: ${filename}`);
    }
    
    return {
      src: imageData.url,
      alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
      name: filename,
      width: imageData.width,
      height: imageData.height,
      make: imageData.exif?.make,
      model: imageData.exif?.model,
      lensMake: imageData.exif?.lensMake,
      lensModel: imageData.exif?.lensModel,
      fstop: imageData.exif?.fstop,
      exposureTime: imageData.exif?.exposureTime
    };
    
  } catch (error) {
    console.error(`Error getting high res image ${filename} from ${highResPath}:`, error);
    
    // Fallback to a basic response if manifest lookup fails
    return {
      src: `/${highResPath}/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
      name: filename,
    };
  }
}