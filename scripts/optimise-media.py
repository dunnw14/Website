#!/usr/bin/env python3
"""
Builds the lightweight copies of everything in public/media/ that the site
actually loads, and records each original's pixel size.

    python3 scripts/optimise-media.py        (needs Pillow: pip install pillow)

Run it again whenever an image is added or replaced. Output:
  public/media/opt/<name>-<width>.webp   resized WebP copies (never upscaled)
  src/data/media-sizes.json              { "media/x.png": { w, h, widths: [...] } }

The originals stay untouched; the case study lightbox still opens them at
full resolution so journey maps can be read.
"""
import json, pathlib
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = pathlib.Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"
OPT = MEDIA / "opt"
WIDTHS = [640, 1200, 2000]

OPT.mkdir(exist_ok=True)
sizes = {}
for path in sorted(MEDIA.iterdir()):
    if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        continue
    with Image.open(path) as im:
        w, h = im.size
        made = []
        for target in WIDTHS:
            width = min(target, w)
            if width in made:
                continue
            out = OPT / f"{path.stem}-{width}.webp"
            if not out.exists() or out.stat().st_mtime < path.stat().st_mtime:
                copy = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
                copy = copy.resize((width, round(h * width / w)), Image.LANCZOS)
                copy.save(out, "WEBP", quality=82, method=6)
            made.append(width)
        sizes[f"media/{path.name}"] = {"w": w, "h": h, "widths": made}

(ROOT / "src" / "data" / "media-sizes.json").write_text(json.dumps(sizes, indent=2) + "\n")
print(f"{len(sizes)} images, variants in {OPT.relative_to(ROOT)}")
