# Restore rounded corners and add Gooey navigation

## What will change
- Restore the site’s earlier, softer corner treatment across cards, panels, and navigation surfaces while keeping the current colors and layout.
- Add a reusable GooeyNav component based on the supplied React Bits JavaScript/CSS implementation.
- Replace the desktop navigation button row with GooeyNav, preserving all five existing sections and smooth scrolling.
- Keep the mobile menu readable and touch-friendly, with the same active-section behavior and matching rounded corners.
- Adapt particle colors to the existing saffron, red, and gold theme and respect reduced-motion settings.

## Technical details
- Use semantic theme variables rather than the pasted black/white defaults.
- Synchronize GooeyNav with scroll-driven active-section changes, not only clicks.
- Preserve the existing phone, directions, mobile menu, and GlassSurface behavior.
- Verify desktop and mobile navigation interactions in the live preview.
