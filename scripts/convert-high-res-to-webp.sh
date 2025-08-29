#!/bin/bash
# filepath: /Users/tobiasborning/Personlig/personal-website/convert-all-to-webp.sh

echo "Converting JPGs to WebP in high-res and creating preview versions..."

# Navigate to the collections directory
cd "$(dirname "$0")/collections"

# Check if cwebp is installed
if ! command -v cwebp >/dev/null 2>&1; then
    echo "Error: cwebp is not installed. Install with: brew install webp"
    exit 1
fi

# Check if exiftool is available for orientation handling
if ! command -v exiftool >/dev/null 2>&1; then
    echo "Warning: exiftool not found. Install with: brew install exiftool"
    echo "Images may not preserve correct orientation."
fi

total_converted=0
total_previews=0
total_saved_space=0

# Loop through each collection folder
for collection in */; do
    if [ -d "${collection}high-res" ]; then
        echo "Processing collection: $collection"
        
        # Ensure preview directory exists
        mkdir -p "${collection}preview"
        
        cd "${collection}high-res"
        
        collection_count=0
        collection_previews=0
        collection_saved=0
        
        # Convert all JPG files to WebP
        for file in *.jpg *.jpeg *.JPEG *.JPG; do
            if [ -f "$file" ]; then
                filename="${file%.*}"
                webp_name="${filename}.webp"
                preview_name="${filename}-preview.webp"
                preview_path="../preview/$preview_name"
                
                echo "  Converting: $file -> $webp_name + preview"
                
                # Get original file size
                original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                
                # Convert to high-res WebP
                cwebp -q 90 -m 6 -metadata all "$file" -o "$webp_name"
                
                if [ $? -eq 0 ]; then
                    # Get WebP file size
                    webp_size=$(stat -f%z "$webp_name" 2>/dev/null || stat -c%s "$webp_name" 2>/dev/null)
                    
                    if [ -n "$original_size" ] && [ -n "$webp_size" ]; then
                        saved_bytes=$((original_size - webp_size))
                        reduction=$((100 - (webp_size * 100 / original_size)))
                        echo "    High-res size reduction: ${reduction}%"
                        collection_saved=$((collection_saved + saved_bytes))
                    fi
                    
                    # Create preview version
                    cwebp -q 10 -m 2 -metadata all "$file" -o "$preview_path"
                    
                    if [ $? -eq 0 ]; then
                        # Show preview size
                        preview_size=$(stat -f%z "$preview_path" 2>/dev/null || stat -c%s "$preview_path" 2>/dev/null)
                        if [ -n "$preview_size" ]; then
                            size_kb=$(echo "scale=0; $preview_size / 1024" | bc -l 2>/dev/null || echo "?")
                            echo "    Preview created: ${size_kb}KB"
                        fi
                        ((collection_previews++))
                        ((total_previews++))
                    else
                        echo "    Error creating preview for $file"
                        [ -f "$preview_path" ] && rm "$preview_path"
                    fi
                    
                    # Delete the original JPG file
                    rm "$file"
                    echo "    Deleted original: $file"
                    
                    ((collection_count++))
                    ((total_converted++))
                else
                    echo "    Error converting $file, keeping original"
                    # Remove failed WebP file if it exists
                    [ -f "$webp_name" ] && rm "$webp_name"
                fi
            fi
        done
        
        if [ $collection_count -gt 0 ]; then
            echo "  Collection summary: $collection_count files converted, $collection_previews previews created"
            if [ $collection_saved -gt 0 ]; then
                echo "  Space saved: $(numfmt --to=iec $collection_saved 2>/dev/null || echo $collection_saved) bytes"
                total_saved_space=$((total_saved_space + collection_saved))
            fi
        else
            echo "  No JPG files found in this collection"
        fi
        
        cd "../.."
    else
        echo "Skipping $collection (no high-res folder found)"
    fi
done

echo ""
echo "=== CONVERSION COMPLETE ==="
echo "Total high-res files converted: $total_converted"
echo "Total preview files created: $total_previews"
if [ $total_saved_space -gt 0 ]; then
    echo "Total space saved: $(numfmt --to=iec $total_saved_space 2>/dev/null || echo $total_saved_space) bytes"
fi
echo "All original JPG files have been replaced with WebP versions in high-res and preview folders."