from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFont


if len(sys.argv) < 3:
    raise SystemExit("Usage: make-image-audit.py <output.png> <image> [<image> ...]")

output = Path(sys.argv[1]).resolve()
inputs = [Path(value).resolve() for value in sys.argv[2:]]
thumb_size = 360
label_height = 54
columns = min(4, len(inputs))
rows = (len(inputs) + columns - 1) // columns
sheet = Image.new("RGB", (columns * thumb_size, rows * (thumb_size + label_height)), "#f4f0e8")
draw = ImageDraw.Draw(sheet)
font = ImageFont.load_default(size=18)

for index, image_path in enumerate(inputs):
    with Image.open(image_path) as source:
        image = source.convert("RGBA")
        image.thumbnail((thumb_size - 16, thumb_size - 16), Image.Resampling.LANCZOS)
        background = Image.new("RGBA", (thumb_size, thumb_size), "#ffffff")
        x = (thumb_size - image.width) // 2
        y = (thumb_size - image.height) // 2
        background.alpha_composite(image, (x, y))
        column = index % columns
        row = index // columns
        sheet.paste(background.convert("RGB"), (column * thumb_size, row * (thumb_size + label_height)))
        label = image_path.stem
        if len(label) > 39:
            label = f"{label[:39]}\n{label[39:78]}"
        draw.multiline_text((column * thumb_size + 8, row * (thumb_size + label_height) + thumb_size + 5), label, fill="#111111", font=font, spacing=2)

output.parent.mkdir(parents=True, exist_ok=True)
sheet.save(output)
print(output)
