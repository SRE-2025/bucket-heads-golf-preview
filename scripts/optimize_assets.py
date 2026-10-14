from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "dist" / "assets" / "hats"
target = root / "dist" / "assets" / "hats-webp"
target.mkdir(parents=True, exist_ok=True)

for path in sorted(source.glob("*.png")):
    with Image.open(path) as image:
        image.save(target / f"{path.stem}.webp", "WEBP", quality=88, method=3)

print(f"optimized={len(list(target.glob('*.webp')))}")
