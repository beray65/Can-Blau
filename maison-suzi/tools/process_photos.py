#!/usr/bin/env python3
"""Dev-time only: color-grade and export the client's real product photos as WebP.
Not shipped to production; assets/img/*.webp are the deliverable."""
import os
from PIL import Image, ImageEnhance, ImageOps, ImageFilter, ImageChops

SRC = os.path.join(os.path.dirname(__file__), "..", "assets", "photos", "source")
DST = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
os.makedirs(DST, exist_ok=True)

# (source filename, output name, max long-edge px, quality)
JOBS = [
    ("85c3de25-IMG_9758.jpeg", "naked-cake.webp", 1800, 82),
    ("804579f1-IMG_9334.png", "eclair.webp", 1300, 82),
    ("e0848a78-IMG_9756.jpeg", "tiramisu.webp", 1300, 82),
    ("3278fa3d-IMG_9328.jpeg", "birthday-cake.webp", 1300, 82),
    ("55c7c4ee-IMG_9753.jpeg", "tartaletas.webp", 1600, 82),
    ("70bbcfb7-IMG_9759.jpeg", "cheesecake.webp", 1300, 82),
    ("f7043d41-IMG_9754.jpeg", "vasito-frambuesa.webp", 1300, 82),
]

def grade(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    # Subtle warmth shift toward the site's gold/chocolate palette
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.02)))
    b = b.point(lambda v: int(v * 0.98))
    im = Image.merge("RGB", (r, g, b))
    # A first pass at this (contrast 1.03, color 1.04) turned out too subtle to
    # actually see. The real issue isn't color anyway — it's that the source
    # photo is lit and staged like a studio shoot (dramatic rim light, propped
    # bokeh background); grading can only push against that, not undo it. So:
    # push much harder. Flatten the contrast well below 1 (studio shots lean on
    # deep blacks and blown highlights — a phone photo in a kitchen doesn't),
    # desaturate below 1 instead of boosting, and make the grain visible instead
    # of barely-there.
    im = ImageEnhance.Contrast(im).enhance(0.88)
    im = ImageEnhance.Color(im).enhance(0.86)
    im = ImageEnhance.Brightness(im).enhance(1.04)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=15, threshold=4))
    im = add_grain(im)
    return im

def add_grain(im: Image.Image, sigma: int = 22, amount: float = 0.22) -> Image.Image:
    """Visible film-like grain so the photo reads as a real capture instead of
    a too-clean render."""
    noise = Image.effect_noise(im.size, sigma).convert("RGB")
    textured = ImageChops.overlay(im, noise)
    return Image.blend(im, textured, amount)

def resize_cap(im: Image.Image, max_edge: int) -> Image.Image:
    w, h = im.size
    if max(w, h) <= max_edge:
        return im
    if w >= h:
        nw, nh = max_edge, round(h * max_edge / w)
    else:
        nh, nw = max_edge, round(w * max_edge / h)
    return im.resize((nw, nh), Image.LANCZOS)

# Manual pre-crop boxes (left, top, right, bottom) to trim distracting background
# elements (e.g. a knife block, or an exported numbered label badge) before grading.
_badge = lambda w, h: (0, 135, w, h)  # top-left "0N" label badge on the AI-enhanced set
# The new tiramisu shot is a wide row of 7 cups; tighten to the center few so the
# site's portrait (4:5) crops read as an intentional close shot, not a random sliver.
_center_narrow = lambda w, h: (int(w * 0.21), 0, int(w * 0.79), h)
PRECROP_FN = {
    "3f5b719e-IMG_9330.jpeg": _badge,
    "f2ea3e5d-IMG_9331.jpeg": _badge,
    "ab6cabca-IMG_9333.jpeg": _badge,
    "70f31e25-IMG_9329.jpeg": _badge,
    "e0848a78-IMG_9756.jpeg": _center_narrow,
}

for src_name, out_name, max_edge, quality in JOBS:
    src_path = os.path.join(SRC, src_name)
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if src_name in PRECROP_FN:
        im = im.crop(PRECROP_FN[src_name](*im.size))
    im = grade(im)
    im = resize_cap(im, max_edge)
    out_path = os.path.join(DST, out_name)
    im.save(out_path, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(out_path) / 1024
    print(f"{out_name}: {im.size[0]}x{im.size[1]} -> {kb:.0f} KB")

# Extra: a tight macro crop of the naked cake's top tier for a gallery "detail" shot.
im = Image.open(os.path.join(SRC, "85c3de25-IMG_9758.jpeg"))
im = ImageOps.exif_transpose(im).convert("RGB")
w, h = im.size
box = (int(w*0.06), int(h*0.28), int(w*0.94), int(h*0.52))
detail = im.crop(box)
detail = grade(detail)
detail = resize_cap(detail, 1300)
detail.save(os.path.join(DST, "naked-cake-detail.webp"), "WEBP", quality=82, method=6)
print("naked-cake-detail.webp:", detail.size)
