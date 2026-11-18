# Spline 3D Scene Component & Preview

Yeh folder Spline 3D interactive scene ke liye create kiya gaya hai.

## Files:
1. `Home.tsx`:
   - React / Next.js client component jo dynamic import ke zariye `@splinetool/react-spline` load karta hai.
   - ResizeObserver ke sath responsive auto-scaling (`BASE_WIDTH = 1440`, `BASE_HEIGHT = 900`).
   - 15% top/bottom cropping takay scene cleanly fit ho aur watermarks hide rahein.
   - Scene URL: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`

2. `index.html`:
   - Standalone browser preview file.
   - Spline official web component ke sath direct run hota hai (bina kisi server ya node_modules ke).
   - "Cropped View" aur "Full Screen View" ke darmiyan toggle kar sakte hain.
   - Mouse / Touch se 360 degree rotation, zoom, aur drag support karta hai.

## Preview Kaise Dekhein:
- Browser mein direct `spline-preview/index.html` file open karein.
- Ya agar dev server chal raha hai: `http://localhost:5173/spline-preview.html`

