// generate-manifest-sharp.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import exifReader from 'exif-reader';


const generateImageUrl = (collectionPath) => {
  const encodedPath = encodeURIComponent(`collections/${collectionPath}`);
  return `https://firebasestorage.googleapis.com/v0/b/portfolio-729be.firebasestorage.app/o/${encodedPath}?alt=media`;
};

const formatExposureTime = (exposureTime) => {
  if (!exposureTime || exposureTime <= 0) return undefined;
  
  if (exposureTime >= 1) {
    return exposureTime % 1 === 0 ? `${exposureTime}s` : `${exposureTime.toFixed(1)}s`;
  }
  
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}`;
};

const processImage = async (imagePath, relativePath) => {
  try {
    const metadata = await sharp(imagePath).metadata();
    let exifData = {};
    
    if (metadata.exif) {
      const exif = exifReader(metadata.exif);
      exifData = {
        make: exif.Image?.Make,
        model: exif.Image?.Model,
        lensMake: exif.Photo?.LensMake,
        lensModel: exif.Photo?.LensModel,
        fstop: exif.Photo?.FNumber,
        exposureTime: formatExposureTime(exif.Photo?.ExposureTime),
        iso: exif.Photo?.ISOSpeedRatings,
        focalLength: exif.Photo?.FocalLength,
        dateTime: exif.Image?.DateTime
      };
    }
    
    return {
      url: generateImageUrl(relativePath),
      filename: path.basename(imagePath),
      width: metadata.width,
      height: metadata.height,
      exif: exifData
    };
    
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return null;
  }
};

const scanDirectory = async (dirPath, relativePath = '') => {
  const items = fs.readdirSync(dirPath);
  const result = {};
  
  // Check for about.json in this directory
  const aboutJsonPath = path.join(dirPath, 'about.json');
  if (fs.existsSync(aboutJsonPath)) {
    try {
      const aboutContent = fs.readFileSync(aboutJsonPath, 'utf8');
      const aboutData = JSON.parse(aboutContent);
      result._about = aboutData;
      console.log(`📋 Found about.json in ${relativePath || 'root'}`);
    } catch (error) {
      console.warn(`Failed to parse about.json in ${dirPath}:`, error.message);
    }
  }
  
  for (const item of items) {
    if (item === 'about.json') continue; // Skip, already processed above
    
    const fullPath = path.join(dirPath, item);
    const itemRelativePath = relativePath ? `${relativePath}/${item}` : item;
    
    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively scan subdirectories
      result[item] = await scanDirectory(fullPath, itemRelativePath);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
      // Process image files
      const imageData = await processImage(fullPath, itemRelativePath);
      if (imageData) {
        result[item] = imageData;
        console.log(`✅ Processed: ${itemRelativePath} (${imageData.width}x${imageData.height})`);
      }
    }
  }
  
  return result;
};

console.log('Generating manifest with Sharp...');

const collectionsPath = path.join(process.cwd(), 'collections');
const manifest = await scanDirectory(collectionsPath);

// Save manifest
fs.writeFileSync('./public/images-manifest.json', JSON.stringify(manifest, null, 2));

console.log('✅ Manifest saved to ./public/images-manifest.json');
console.log('📊 Collections found:', Object.keys(manifest).length);