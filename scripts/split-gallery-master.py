from pathlib import Path
import sys

from PIL import Image, ImageChops, ImageDraw


def clean_product_alpha(alpha):
    binary = alpha.point(lambda value: 255 if value > 10 else 0)
    remaining = binary.copy()
    components = []
    while True:
        bounds = remaining.getbbox()
        if not bounds:
            break
        top_row = remaining.crop((bounds[0], bounds[1], bounds[2], bounds[1] + 1))
        row_bounds = top_row.getbbox()
        if not row_bounds:
            break
        seed = (bounds[0] + row_bounds[0], bounds[1])
        before = remaining.copy()
        ImageDraw.floodfill(remaining, seed, 0)
        component = ImageChops.subtract(before, remaining)
        pixel_count = component.histogram()[255]
        if pixel_count:
            components.append((pixel_count, component))

    if not components:
        return alpha, binary

    _, keep = max(components, key=lambda item: item[0])
    return ImageChops.multiply(alpha, keep), keep


if len(sys.argv) != 3:
    raise SystemExit("Usage: split-gallery-master.py <master.png> <product-handle>")

master_path = Path(sys.argv[1]).resolve()
handle = sys.argv[2]
repo_root = Path(__file__).resolve().parents[1]
output_dir = repo_root / "dist" / "assets" / "product-gallery" / handle
output_dir.mkdir(parents=True, exist_ok=True)

with Image.open(master_path) as source:
    image = source.convert("RGBA")
    half_width = image.width // 2
    half_height = image.height // 2
    boxes = {
        "front": (0, 0, half_width, half_height),
        "three-quarter": (half_width, 0, image.width, half_height),
        "side": (0, half_height, half_width, image.height),
        "rear": (half_width, half_height, image.width, image.height),
    }
    for name, box in boxes.items():
        panel = image.crop(box)
        inset = min(4, panel.width // 20, panel.height // 20)
        panel = panel.crop((inset, inset, panel.width - inset, panel.height - inset))
        cleaned_alpha, keep_mask = clean_product_alpha(panel.getchannel("A"))
        panel.putalpha(cleaned_alpha)
        content_box = keep_mask.getbbox()
        if not content_box:
            raise RuntimeError(f"No visible product pixels in {handle} {name}")
        product = panel.crop(content_box)
        product.thumbnail((565, 565), Image.Resampling.LANCZOS)
        normalized = Image.new("RGBA", (627, 627), (0, 0, 0, 0))
        normalized.alpha_composite(product, ((627 - product.width) // 2, (627 - product.height) // 2))
        normalized.save(output_dir / f"{name}.webp", "WEBP", quality=92, method=4)

print(f"Created four gallery images for {handle} in {output_dir}")
