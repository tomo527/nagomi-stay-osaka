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

/**
 * Normalizes a string for matching by removing special characters,
 * extra spaces, and converting to lowercase.
 * E.g., "Air Conditioning (AC/Heating)" -> "airconditioningacheating"
 */
function normalizeForMatch(str: string): string {
    // Replace &, /, -, _, (, ) with spaces, then remove all whitespace
    return str.toLowerCase()
        .replace(/&|and|\/|-|–|—|_|\(|\)/g, ' ')
        .replace(/\s+/g, '');
}

/**
 * Finds an exact or normalized match for an amenity name within a list of photo paths.
 */
export function getExactOrNormalizedPhoto(itemName: string, availablePhotos: string[]): string | null {
    if (!availablePhotos || availablePhotos.length === 0) return null;

    // 1. Exact match (ignoring case and extension)
    const targetLower = itemName.toLowerCase();
    const exactMatch = availablePhotos.find(photoPath => {
        const filename = path.basename(photoPath);
        const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').toLowerCase();
        return nameWithoutExt === targetLower;
    });

    if (exactMatch) return exactMatch;

    // 2. Normalized match
    const targetNormalized = normalizeForMatch(itemName);
    const normalizedMatch = availablePhotos.find(photoPath => {
        const filename = path.basename(photoPath);
        const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
        const fileNormalized = normalizeForMatch(nameWithoutExt);
        return fileNormalized === targetNormalized;
    });

    return normalizedMatch || null;
}
