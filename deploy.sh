#!/bin/bash
# Main deployment script

set -e  # Exit on any error

echo "🚀 Starting deployment process..."
echo "================================"

# Step 1: Convert images to WebP
echo "📸 Step 1: Converting images to WebP..."
if [ -f "./scrips/convert-high-res-to-webp.sh" ]; then
    chmod +x ./scripts/convert-high-res-to-webp.sh
    ./scripts/convert-high-res-to-webp.sh
    echo "✅ Image conversion complete"
else
    echo "⚠️  convert-high-res-to-webp.sh not found, skipping..."
fi

echo ""

# Step 2: Upload images to Firebase Storage
echo "☁️  Step 2: Uploading images to Firebase Storage..."
if [ -f "./scripts/upload-images-to-storage.js" ]; then
    node scripts/upload-images-to-storage.js
    echo "✅ Image upload complete"
else
    echo "❌ upload-images-to-storage.js not found!"
    exit 1
fi

echo ""

# Step 3: Generate manifest
echo "📋 Step 3: Generating image manifest..."
if [ -f "./scripts/generate-manifest.js" ]; then
    node scripts/generate-manifest.js
    echo "✅ Manifest generation complete"
else
    echo "❌ generate-manifest.js not found!"
    exit 1
fi

echo ""

# Step 4: Deploy to Firebase
echo "🔥 Step 4: Deploying to Firebase..."
if command -v firebase >/dev/null 2>&1; then
    firebase deploy
    echo "✅ Firebase deployment complete"
else
    echo "❌ Firebase CLI not found! Install with: npm install -g firebase-tools"
    exit 1
fi

echo ""
echo "🎉 Deployment complete!"
echo "======================"