# Chef P's Kitchen — Brand assets

All assets in this folder were **extracted programmatically** from the source brand PDF
(`brand-source/Chef_P_s_-_MAIN.pdf`). They are reproducible — nothing was redrawn by hand.

## Why the pipeline looks the way it does

The usual tooling (`pdftoppm`, ImageMagick `magick`, `mutool`) is **not installed** on this
machine, and the Windows Store `python3` alias is a non-functional stub. Python itself is
available via the `py` launcher (3.14), and Node 24 is present. So extraction was done with
**Node + [`pdf-to-img`](https://www.npmjs.com/package/pdf-to-img)** (renders PDF pages to PNG via
pdf.js + skia canvas) and **[`sharp`](https://sharp.pixelplumbing.com/)** (trim, resize, colour
keying, compositing). The scripts live in a throwaway folder outside the repo; the steps are
recorded below so the result can be regenerated.

## Page → output map

| Source page | What it is | Output file(s) |
| --- | --- | --- |
| 2 (dark wordmark on white) | Primary wordmark | `wordmark-light.png` (white keyed → transparent) |
| 2 (gold stroke isolated)   | Brush swoosh only | `swoosh.png` (gold hue isolated → transparent) — drives the hero signature |
| 3 (white wordmark on black)| Primary wordmark, dark | `wordmark-dark.png` (black keyed → transparent) |
| 4 (stamp on light)         | Circular "Ps" stamp | `stamp-light.png` → also `icon-512/192`, `apple-icon`, `favicon-32`, `og-image` |
| 5 (stamp on black)         | Stamp, dark | `stamp-dark.png` |
| 8 (cream leaf banner)      | Botanical line-art | `texture-leaves.png` (top-left cluster, cream keyed → transparent) |
| 9 (Catering & Events lockup)| Events hero lockup | `catering-lockup.png` (designed dark banner, trimmed) |

## How it was produced (reproduce)

```bash
# scratch tooling (kept out of the app dependencies)
mkdir pdftools && cd pdftools && npm init -y
npm install pdf-to-img@4 sharp

# 1. render the asset pages at scale 8 (~1900px+ wide) to PNG
#    pdf("…/Chef_P_s_-_MAIN.pdf", { scale: 8 })  -> page-N.png
# 2. colour-key + trim + resize with sharp (raw RGBA pixel loop):
#    - keyWhite():  drop low-saturation near-white bg (pages 2,4)  -> keeps black + gold + terracotta
#    - keyBlack():  drop low-saturation near-black bg (pages 3,5)  -> bg measured at #1a1a1a / #0f0f0f
#    - keyGoldOnly(): keep only golden pixels (page 2)             -> isolates the swoosh
#    - keyCream():  drop cream bg (page 8)                         -> keeps faint leaf line-art
# 3. icons: stamp-light composited centred on a cream square with ~14% safe padding
# 4. og-image: wordmark-light centred on a 1200×630 cream canvas
```

Each keyed asset was QA'd by compositing it onto its real target background (dark art on
`#0F0F0F`, light art on `#FBF2E3`) to confirm no white/black halo survived the key.

## Notes / caveats

- `swoosh.png` has a small notch mid-stroke where the original "P's" descender crossed the
  brush. It is authentic to the source and unobtrusive at display size.
- `catering-lockup.png` is a full-colour designed banner (its dark texture is part of the
  artwork), so it is trimmed, not keyed. Delivered via `next/image` so the ~2 MB source is
  optimised on the fly.
- Raster is fine for these lockups at sensible sizes (exported at ~2× display width). The hero
  signature animates `swoosh.png` via a `clip-path` wipe, so no vector tracing was needed.
- A true `.ico` was not generated (sharp can't write ICO); Next.js serves PNG icons via the
  metadata/manifest instead (`icon-192/512`, `apple-icon`).
