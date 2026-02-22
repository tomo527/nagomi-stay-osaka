import fs from 'node:fs';
import path from 'node:path';

/**
 * Returns a list of image paths from the specified directory in public/photos.
 * Example: getPhotosInDir('05_Bedroom1', '05_Bedroom_Wa')
 * Returns: ['/photos/05_Bedroom1/img1.jpg', ...]
 */
export function getPhotosInDir(primaryDir: string, fallbackDir?: string): string[] {
    const cwd = process.cwd();

    // Define helper to read a dir
    const readDir = (dirName: string): string[] | null => {
        try {
            const fullPath = path.join(cwd, 'public', 'photos', dirName);
            if (!fs.existsSync(fullPath)) return null;

            const files = fs.readdirSync(fullPath);
            // Filter images (basic check)
            const images = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

            // Sort alphabetically to maintain consistent order
            images.sort();

            return images.map(img => `/photos/${dirName}/${img}`);
        } catch (e) {
            console.error(`Error reading directory ${dirName}:`, e);
            return null;
        }
    };

    let photos = readDir(primaryDir);

    if ((!photos || photos.length === 0) && fallbackDir) {
        photos = readDir(fallbackDir);
    }

    return photos || [];
}
