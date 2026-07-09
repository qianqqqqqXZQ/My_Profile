from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageColor, ImageDraw, ImageFilter, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path(r"D:\WeChat Files\wxid_j2qwjvkrxwcy22\FileStorage\Temp\2e266c88e03bb63b88d29d3c5f94f28.jpg")
OUTPUT_DIR = ROOT / "generated-site" / "public" / "generated"

BASE_SIZE = 64
MASTER_SIZE = 256


def clamp_channel(value: float) -> int:
    return max(0, min(255, round(value)))


def adjust(color: tuple[int, int, int], factor: float) -> tuple[int, int, int]:
    return tuple(clamp_channel(channel * factor) for channel in color)


def blend(
    a: tuple[int, int, int], b: tuple[int, int, int], ratio: float
) -> tuple[int, int, int]:
    return tuple(clamp_channel(x * (1 - ratio) + y * ratio) for x, y in zip(a, b))


def get_palette() -> dict[str, tuple[int, int, int, int]]:
    image = Image.open(SOURCE).convert("RGB")
    crop = image.crop((120, 70, 640, 620))
    stat = ImageStat.Stat(crop)
    fur = tuple(int(channel) for channel in stat.mean)

    highlight = adjust(fur, 1.22)
    shadow = adjust(fur, 0.74)
    deep_shadow = adjust(fur, 0.52)
    muzzle = blend(fur, (227, 191, 129), 0.45)
    muzzle_shadow = adjust(muzzle, 0.82)
    inner_ear = blend(shadow, (124, 96, 96), 0.5)

    return {
        "outline": (*ImageColor.getrgb("#3b2618"), 255),
        "fur": (*fur, 255),
        "highlight": (*highlight, 255),
        "shadow": (*shadow, 255),
        "deep_shadow": (*deep_shadow, 255),
        "muzzle": (*muzzle, 255),
        "muzzle_shadow": (*muzzle_shadow, 255),
        "inner_ear": (*inner_ear, 255),
        "eye": (*ImageColor.getrgb("#17110d"), 255),
        "eye_shine": (*ImageColor.getrgb("#f6eedf"), 255),
        "nose": (*ImageColor.getrgb("#6c4634"), 255),
        "mouth": (*ImageColor.getrgb("#8a4f37"), 255),
        "tongue": (*ImageColor.getrgb("#bf7a6c"), 255),
    }


def draw_shadow_ellipse(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int, int],
    offset: int = 1,
) -> None:
    x0, y0, x1, y1 = box
    draw.ellipse((x0, y0 + offset, x1, y1 + offset), fill=fill)


def build_icon() -> Image.Image:
    palette = get_palette()
    icon = Image.new("RGBA", (BASE_SIZE, BASE_SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)

    draw_shadow_ellipse(draw, (7, 6, 24, 23), palette["outline"])
    draw_shadow_ellipse(draw, (39, 6, 56, 23), palette["outline"])
    draw.ellipse((8, 5, 24, 21), fill=palette["fur"])
    draw.ellipse((40, 5, 56, 21), fill=palette["fur"])
    draw.ellipse((11, 9, 21, 19), fill=palette["inner_ear"])
    draw.ellipse((43, 9, 53, 19), fill=palette["inner_ear"])

    draw.rounded_rectangle((10, 12, 54, 53), radius=17, fill=palette["outline"])
    draw.rounded_rectangle((11, 11, 53, 52), radius=17, fill=palette["fur"])

    draw.ellipse((16, 11, 46, 23), fill=palette["highlight"])
    draw.polygon(
        [(18, 18), (26, 10), (31, 18), (37, 10), (45, 19), (40, 27), (23, 27)],
        fill=palette["highlight"],
    )
    draw.polygon(
        [(10, 28), (18, 24), (19, 34), (14, 42), (11, 38)],
        fill=palette["shadow"],
    )
    draw.polygon(
        [(54, 27), (46, 24), (45, 34), (50, 42), (53, 38)],
        fill=palette["shadow"],
    )
    draw.rectangle((17, 31, 47, 49), fill=palette["fur"])
    draw.polygon([(17, 31), (47, 31), (44, 23), (20, 23)], fill=palette["highlight"])

    draw.rounded_rectangle((18, 27, 46, 48), radius=10, fill=palette["muzzle"])
    draw.ellipse((18, 35, 46, 49), fill=palette["muzzle_shadow"])
    draw.ellipse((27, 27, 37, 38), fill=palette["nose"])
    draw.ellipse((28, 28, 36, 33), fill=blend(palette["nose"][:3], (255, 255, 255), 0.1) + (255,))

    draw.ellipse((18, 24, 25, 31), fill=palette["deep_shadow"])
    draw.ellipse((39, 24, 46, 31), fill=palette["deep_shadow"])
    draw.ellipse((19, 24, 24, 29), fill=palette["eye"])
    draw.ellipse((40, 24, 45, 29), fill=palette["eye"])
    draw.point((22, 25), fill=palette["eye_shine"])
    draw.point((43, 25), fill=palette["eye_shine"])

    draw.line((28, 36, 24, 41), fill=palette["outline"], width=2)
    draw.line((37, 36, 41, 41), fill=palette["outline"], width=2)
    draw.line((24, 41, 32, 45), fill=palette["outline"], width=2)
    draw.line((41, 41, 32, 45), fill=palette["outline"], width=2)
    draw.ellipse((28, 41, 36, 47), fill=palette["mouth"])
    draw.ellipse((30, 43, 34, 47), fill=palette["tongue"])

    draw.arc((16, 32, 24, 40), start=210, end=315, fill=palette["shadow"], width=1)
    draw.arc((40, 32, 48, 40), start=225, end=330, fill=palette["shadow"], width=1)

    icon = icon.filter(ImageFilter.SHARPEN)
    return icon


def save_outputs(icon: Image.Image) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    master = icon.resize((MASTER_SIZE, MASTER_SIZE), Image.Resampling.NEAREST)
    master_path = OUTPUT_DIR / "favicon-bear-stardew-master.png"
    icon16_path = OUTPUT_DIR / "favicon-bear-stardew-16.png"
    icon32_path = OUTPUT_DIR / "favicon-bear-stardew-32.png"
    ico_path = OUTPUT_DIR / "favicon-bear-stardew.ico"

    master.save(master_path)
    icon.resize((32, 32), Image.Resampling.NEAREST).save(icon32_path)
    icon.resize((16, 16), Image.Resampling.NEAREST).save(icon16_path)
    master.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    preview = Image.new("RGBA", (MASTER_SIZE + 96, MASTER_SIZE + 96), (243, 234, 214, 255))
    preview.paste(master, (48, 48), master)
    ImageOps.expand(preview, border=1, fill="#7f654f").save(OUTPUT_DIR / "favicon-bear-stardew-preview.png")


if __name__ == "__main__":
    save_outputs(build_icon())
