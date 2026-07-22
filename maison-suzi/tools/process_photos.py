#!/usr/bin/env python3
"""Dev-time only: color-grade and export the client's real product photos as WebP.
Not shipped to production; assets/img/*.webp are the deliverable."""
import os
from PIL import Image, ImageEnhance, ImageOps, ImageFilter

SRC = os.path.join(os.path.dirname(__file__), "..", "assets", "photos", "source")
DST = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
os.makedirs(DST, exist_ok=True)

# (source filename, output name, max long-edge px, quality)
JOBS = [
    ("940445b5-IMG_9325.jpeg", "naked-cake.webp", 1800, 82),
    ("3ce66911-IMG_9324.jpeg", "eclair.webp", 1300, 82),
    ("0d1c34e6-IMG_9327.jpeg", "tiramisu.webp", 1300, 82),
    ("3278fa3d-IMG_9328.jpeg", "birthday-cake.webp", 1300, 82),
    ("7f35932c-d5d49265315b46c08902ac93c84a73c9.jpeg", "tartaletas.webp", 1600, 82),
]

def grade(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    # Subtle warmth shift toward the site's gold/chocolate palette
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.035)))
    b = b.point(lambda v: int(v * 0.965))
    im = Image.merge("RGB", (r, g, b))
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.14)
    im = ImageEnhance.Brightness(im).enhance(1.02)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=2))
    return im

def resize_cap(im: Image.Image, max_edge: int) -> Image.Image:
    w, h = im.size
    if max(w, h) <= max_edge:
        return im
    if w >= h:
        nw, nh = max_edge, round(h * max_edge / w)
    else:
        nh, nw = max_edge, round(w * max_edge / h)
    return im.resize((nw, nh), Image.LANCZOS)

for src_name, out_name, max_edge, quality in JOBS:
    src_path = os.path.join(SRC, src_name)
    im = Image.open(src_path)
    im = grade(im)
    im = resize_cap(im, max_edge)
    out_path = os.path.join(DST, out_name)
    im.save(out_path, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(out_path) / 1024
    print(f"{out_name}: {im.size[0]}x{im.size[1]} -> {kb:.0f} KB")

# Extra: a tight macro crop of the naked cake's top tier for a gallery "detail" shot
im = Image.open(os.path.join(SRC, "940445b5-IMG_9325.jpeg"))
im = ImageOps.exif_transpose(im).convert("RGB")
w, h = im.size  # 1080 x 1384
# top tier + berries/figs region, roughly the upper-middle third
box = (int(w*0.02), int(h*0.28), int(w*0.98), int(h*0.62))
detail = im.crop(box)
detail = grade(detail)
detail = resize_cap(detail, 1300)
detail.save(os.path.join(DST, "naked-cake-detail.webp"), "WEBP", quality=82, method=6)
print("naked-cake-detail.webp:", detail.size)
