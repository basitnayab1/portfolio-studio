import os
import sys

print("Adding Blender CRT DLL directory to search path...", flush=True)
os.add_dll_directory(r'C:\Program Files\Blender Foundation\Blender 5.3\blender.crt')

import rembg
from PIL import Image

input_path = 'public/assets/mubashir.jpg'
output_png = 'public/assets/mubashir-cutout.png'
output_webp = 'public/assets/mubashir-cutout.webp'
output_420 = 'public/assets/mubashir-cutout-420.webp'

print(f"Reading input image from {input_path}...", flush=True)
img = Image.open(input_path)

print("Removing background with rembg (this will download model on first run if needed)...", flush=True)
cutout = rembg.remove(img)

print("Saving transparent PNG...", flush=True)
cutout.save(output_png, format='PNG')
print(f"Saved {output_png} (size: {os.path.getsize(output_png)} bytes)", flush=True)

print("Saving transparent WebP...", flush=True)
cutout.save(output_webp, format='WEBP', quality=92)
print(f"Saved {output_webp} (size: {os.path.getsize(output_webp)} bytes)", flush=True)

print("Saving 420w cutout for avatar/mobile...", flush=True)
w, h = cutout.size
ratio = 420 / w
cutout_420 = cutout.resize((420, int(h * ratio)), Image.Resampling.LANCZOS)
cutout_420.save(output_420, format='WEBP', quality=90)
print(f"Saved {output_420} (size: {os.path.getsize(output_420)} bytes)", flush=True)

print("SUCCESS: Mubashir transparent PNG and WebP cutouts generated!", flush=True)
