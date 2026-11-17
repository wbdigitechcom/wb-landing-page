# Changelog

## Navbar
The wordmark now scales from 72px to 56px across the first 160px of scroll, and the bar follows it. Blur and shadow use the same progress. Reduced motion snaps between the two sizes.

## Services
Cards use a larger line icon, one benefit line, and a quiet selected state: a blue ring, a check, and a light fill. Hover and focus lift by 2px. The grid stays full width.

## Hero
The blue panel is a browser frame that crossfades the first three reel posters every 4 seconds. It pauses off-screen and when reduced motion is on. “Sign of Experience.” stays in the paragraph.

## Placeholders
Reel posters, the featured still, and the About image are gradient drawings with no caption baked in. A Sample tag appears only when `NEXT_PUBLIC_SHOW_PLACEHOLDER_TAGS=true`. Every file to replace is listed in `PLACEHOLDERS.md`.

## Reviews
Unknown companies use `MISSING_COMPANY` and the card shows the role only. The featured poster is preloaded. The video file is requested only after Play, and only when a `src` is set.
