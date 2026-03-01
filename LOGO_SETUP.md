# Logo Setup Instructions

## Where to Place Your Logo

Place your logo image file in one of these locations:

### Option 1: Using src/assets (Recommended)
1. Save your logo image as `logo.png` (or `logo.jpg`, `logo.svg`, etc.)
2. Place it in: `Frontend/src/assets/images/logo.png`
3. The Navbar is already configured to use this location

### Option 2: Using public folder
1. Save your logo image as `logo.png`
2. Place it in: `Frontend/public/images/logo.png`
3. Update `Navbar.jsx` to use: `src="/images/logo.png"` instead of the import

## Supported Formats
- PNG (recommended for logos with transparency)
- JPG/JPEG
- SVG (scalable, best for logos)
- WebP

## Current Configuration
The logo is currently set up to:
- Display in the navbar
- Link to the home page when clicked
- Show "Esscentials" text next to the logo
- Be responsive on mobile devices

## Logo Styling
The logo image is set to:
- Height: 40px (auto width to maintain aspect ratio)
- Positioned next to the "Esscentials" text
- Hover effect for better UX

## To Update the Logo
1. Replace the file at `Frontend/src/assets/images/logo.png`
2. If using a different filename, update the import in `Navbar.jsx`:
   ```jsx
   import logoImage from '../assets/images/your-logo-name.png';
   ```
3. The changes will appear automatically when you save (if using Vite dev server)




