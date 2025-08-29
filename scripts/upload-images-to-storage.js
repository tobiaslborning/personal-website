// upload-images.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getMetadata, listAll, deleteObject } from "firebase/storage";
import fs from 'fs';
import path from 'path';

const app = initializeApp({
  projectId: "portfolio-729be",
  storageBucket: "portfolio-729be.firebasestorage.app"
});

const storage = getStorage(app);

const fileExists = async (bucketPath) => {
  try {
    await getMetadata(ref(storage, bucketPath));
    return true;
  } catch (error) {
    return false;
  }
};

// Get all local image files recursively
const getLocalImageFiles = (dirPath, basePath = '') => {
  const files = [];
  
  if (!fs.existsSync(dirPath)) return files;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getLocalImageFiles(fullPath, relativePath));
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
      files.push(relativePath);
    }
  }
  
  return files;
};

// Get all remote image files recursively
const getRemoteImageFiles = async (storageRef) => {
  const files = [];
  
  try {
    const result = await listAll(storageRef);
    
    // Add direct files
    for (const item of result.items) {
      if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item.name)) {
        // Get path relative to collections folder
        const fullPath = item.fullPath;
        const relativePath = fullPath.replace('collections/', '');
        files.push(relativePath);
      }
    }
    
    // Recursively process subdirectories
    for (const prefix of result.prefixes) {
      const subFiles = await getRemoteImageFiles(prefix);
      files.push(...subFiles);
    }
  } catch (error) {
    console.error('Error listing remote files:', error.message);
  }
  
  return files;
};

const uploadFile = async (localPath, bucketPath) => {
  try {
    // Check if file already exists in storage
    const exists = await fileExists(bucketPath);
    
    if (exists) {
      console.log(`⏭️  Skipping (exists): ${bucketPath}`);
      return;
    }
    
    const fileBuffer = fs.readFileSync(localPath);
    const storageRef = ref(storage, bucketPath);
    
    await uploadBytes(storageRef, fileBuffer);
    console.log(`✅ Uploaded: ${bucketPath}`);
  } catch (error) {
    console.error(`❌ Failed: ${localPath}`, error.message);
  }
};

const deleteFile = async (bucketPath) => {
  try {
    const storageRef = ref(storage, `collections/${bucketPath}`);
    await deleteObject(storageRef);
    console.log(`🗑️  Deleted: ${bucketPath}`);
  } catch (error) {
    console.error(`❌ Failed to delete: ${bucketPath}`, error.message);
  }
};

const syncImages = async () => {
  console.log('🔍 Scanning local files...');
  const localFiles = getLocalImageFiles('./collections');
  console.log(`📁 Found ${localFiles.length} local image files`);
  
  console.log('🔍 Scanning remote files...');
  const collectionsRef = ref(storage, 'collections');
  const remoteFiles = await getRemoteImageFiles(collectionsRef);
  console.log(`☁️  Found ${remoteFiles.length} remote image files`);
  
  // Find files to upload (local but not remote)
  const filesToUpload = localFiles.filter(file => !remoteFiles.includes(file));
  console.log(`⬆️  Files to upload: ${filesToUpload.length}`);
  
  // Find files to delete (remote but not local)
  const filesToDelete = remoteFiles.filter(file => !localFiles.includes(file));
  console.log(`🗑️  Files to delete: ${filesToDelete.length}`);
  
  // Upload new files
  if (filesToUpload.length > 0) {
    console.log('\n📤 Uploading new files...');
    for (const file of filesToUpload) {
      const localPath = path.join('./collections', file);
      const bucketPath = `collections/${file}`;
      
      const fileBuffer = fs.readFileSync(localPath);
      const storageRef = ref(storage, bucketPath);
      
      try {
        await uploadBytes(storageRef, fileBuffer);
        console.log(`✅ Uploaded: ${file}`);
      } catch (error) {
        console.error(`❌ Failed: ${file}`, error.message);
      }
    }
  }
  
  // Delete removed files
  if (filesToDelete.length > 0) {
    console.log('\n🗑️  Deleting removed files...');
    for (const file of filesToDelete) {
      await deleteFile(file);
    }
  }
  
  console.log('\n📊 Sync Summary:');
  console.log(`   • ${filesToUpload.length} files uploaded`);
  console.log(`   • ${filesToDelete.length} files deleted`);
  console.log(`   • ${localFiles.length - filesToUpload.length} files unchanged`);
};

// Sync all images from /collections
console.log('🔄 Starting image sync (upload new, delete removed)...');
await syncImages();
console.log('✅ Sync complete!');