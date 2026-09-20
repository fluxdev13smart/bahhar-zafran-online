# Responsive loading experience and scroll blur

## Goal
Add a real full-screen loading experience inspired only by the uploaded reference, add a subtle gradual blur while scrolling, and correct low-contrast English text on mobile.

## What will change
- Build a branded Bahar Al Zafran loading screen using the reference’s animated circular pencil, expressive tracking eyes, blinking/winking states, warm saffron styling, and animated exit.
- Keep the loading screen visible while the page’s critical local imagery and fonts load. Treat the main hero and store image as critical; continue when those are ready, when most tracked assets are ready, or after a safe timeout so visitors are never trapped.
- Reveal a **Skip loading** button after two seconds. Skipping will dismiss the loader immediately with a polished, lightweight version of the reference interaction.
- Prevent the loading screen from replaying during same-tab navigation, while allowing it to appear on a fresh visit/reload when loading is actually needed.
- Add the supplied GradualBlur concept as a fixed, subtle bottom-edge blur that becomes visible after scrolling and does not block clicks or obscure important content.
- Strengthen mobile English text colors, especially navigation labels and text displayed over images/glass, while keeping the existing saffron-and-red theme.
- Respect reduced-motion preferences by disabling eye tracking and replacing complex animation with a short fade.

## Technical details
- Create focused `LoadingScreen` and `GradualBlur` React components with separate CSS.
- Track critical image promises, `document.fonts.ready`, window load state, completion ratio, a minimum display interval, and a maximum timeout.
- Use pointer-safe fixed overlays, semantic tokens, accessible status text, and a real button with keyboard focus.
- Mount the loader and scrolling blur once at the application root.
- Verify desktop and phone layouts, automatic completion, the two-second skip state, scroll blur visibility, readable mobile text, and browser console health.
