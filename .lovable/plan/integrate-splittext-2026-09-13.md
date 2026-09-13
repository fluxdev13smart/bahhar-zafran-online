# Integrate SplitText

## Goal
Add the React Bits SplitText animation to the homepage while preserving the existing Bahar Al Zafran design and content.

## Changes
- Add a reusable, typed `SplitText` component using GSAP, ScrollTrigger, and GSAP SplitText.
- Apply it to the main “Bahar Al Zafran” heading as a character-by-character entrance.
- Preserve the heading’s gold styling, responsive sizing, and single-H1 page structure.
- Respect reduced-motion preferences and keep the heading readable before animation setup completes.

## Technical details
- Reuse the already-installed `gsap` and `@gsap/react` dependencies.
- Scope animation cleanup to the component’s own ScrollTrigger and split instance.
- Verify the live homepage at desktop and mobile widths, including console errors and final heading visibility.
