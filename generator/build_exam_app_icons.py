# ============================================================================
# ACS EXAM app : the app's icon on the phone  v1.0 (batch E-1, 19-Nov-2026)
# Made by machine from the ACS seal (logo.png): a navy square, the seal in the middle, a gold "EXAM" band below it.
# Android 8 and newer shapes the icon itself (circle, rounded square...). So the seal and the band stay
# inside the safe circle (66 of 108 parts), and nothing important is cut off on any phone.
# Run:  python generator/build_exam_app_icons.py      (needs Pillow: pip install pillow)
# Writes: android/app/src/main/res/mipmap-*/ic_launcher_fg.png  (5 sizes)
#         android/app/src/main/res/mipmap-*/ic_launcher.png     (5 sizes, the full square, for old launchers)
#         assets/exam-app-icon.png                               (192 px, for the download page)
# ============================================================================
import os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(ROOT, "android", "app", "src", "main", "res")
NAVY = (11, 31, 58, 255)
GOLD = (249, 168, 37, 255)
DENSITIES = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}
FONTS = [
    "/usr/share/fonts/opentype/inter/Inter-Black.otf",
    "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]


def font(px):
    for f in FONTS:
        if os.path.exists(f):
            return ImageFont.truetype(f, px)
    sys.exit("No bold font found: add one to FONTS.")


def foreground(size):
    """The 108-part layer: transparent, the seal and the band inside the 66-part safe circle."""
    u = size / 108.0
    big = 4                                   # draw 4x larger, then shrink: smooth edges
    W = size * big
    im = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    seal = Image.open(os.path.join(ROOT, "logo.png")).convert("RGBA")
    d = int(round(46 * u * big))              # the seal: 46 parts wide, centre 8 parts above the middle
    seal = seal.resize((d, d), Image.LANCZOS)
    cx, cy = W // 2, int(round((54 - 8) * u * big))
    im.alpha_composite(seal, (cx - d // 2, cy - d // 2))
    bw, bh = 40 * u * big, 13 * u * big       # the band: 40 x 13 parts, its top 64 parts down
    x0, y0 = W / 2 - bw / 2, 64 * u * big
    dr = ImageDraw.Draw(im)
    dr.rounded_rectangle([x0, y0, x0 + bw, y0 + bh], radius=bh / 2, fill=GOLD, outline=NAVY, width=max(1, int(u * big)))
    f = font(int(round(9.5 * u * big)))
    t = "EXAM"
    l, t0, r, b = dr.textbbox((0, 0), t, font=f)
    dr.text((W / 2 - (r - l) / 2 - l, y0 + bh / 2 - (b - t0) / 2 - t0), t, font=f, fill=NAVY)
    return im.resize((size, size), Image.LANCZOS)


def full(size):
    """The plain square icon (old launchers, the download page): navy, rounded corners, the same picture."""
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(im).rounded_rectangle([0, 0, size - 1, size - 1], radius=size * 0.18, fill=NAVY)
    fg = foreground(int(round(size * 108 / 66.0)))   # the safe circle fills the square
    o = (fg.size[0] - size) // 2
    im.alpha_composite(fg.crop((o, o, o + size, o + size)))
    return im


def main():
    made = []
    for name, k in DENSITIES.items():
        folder = os.path.join(RES, "mipmap-" + name)
        os.makedirs(folder, exist_ok=True)
        p1 = os.path.join(folder, "ic_launcher_fg.png")
        foreground(int(round(108 * k))).save(p1, optimize=True)
        p2 = os.path.join(folder, "ic_launcher.png")
        full(int(round(48 * k))).save(p2, optimize=True)
        made += [p1, p2]
    p3 = os.path.join(ROOT, "assets", "exam-app-icon.png")
    full(192).save(p3, optimize=True)
    made.append(p3)
    for p in made:
        print("made", os.path.relpath(p, ROOT), os.path.getsize(p), "bytes")


if __name__ == "__main__":
    main()
