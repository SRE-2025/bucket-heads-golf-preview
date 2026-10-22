from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parents[1] / "dist" / "assets" / "product-gallery"
files = list(root.rglob("*.webp"))
assert len(files) == 136, f"Expected 136 images, found {len(files)}"
assert len([path for path in root.iterdir() if path.is_dir()]) == 34

sizes = set()
visible_bounds = []
for path in files:
    with Image.open(path) as source:
        image = source.convert("RGBA")
        sizes.add(image.size)
        bounds = image.getchannel("A").getbbox()
        assert bounds, f"Blank image: {path}"
        visible_bounds.append((bounds[2] - bounds[0], bounds[3] - bounds[1]))

assert sizes == {(627, 627)}, f"Unexpected canvas sizes: {sizes}"
assert min(width for width, _ in visible_bounds) > 150
assert min(height for _, height in visible_bounds) > 120
print(
    f"Validated {len(files)} AI gallery images across 34 products at 627x627; "
    f"visible bounds range from {min(visible_bounds)} to {max(visible_bounds)}"
)
