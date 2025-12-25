---
title: Accessibility (a11y)
description: Designing for everyone.
category: Design
---

# Accessibility (a11y)

## Overview
**Web Accessibility** ensures websites are usable by people with disabilities (visual, auditory, motor, or cognitive). It is not just a moral obligation but often a legal one (ADA, WCAG).

## Key Principles (POUR)
1.  **Perceivable:** Users must be able to see or hear content (Alt text for images, captions for video).
2.  **Operable:** Users must be able to use the UI (Keyboard navigation, no relying solely on a mouse).
3.  **Understandable:** Content is clear, not confusing.
4.  **Robust:** Compatible with assistive technologies (Screen readers).

## Common Quick Wins
-   **Color Contrast:** Text must contrast sufficiently with the background (WCAG AA standard is 4.5:1).
-   **Semantic HTML:** Use `<button>` for buttons, not `<div>`. Screen readers rely on tags to know how to interact.
-   **Focus States:** Never remove the blue outline (`outline: none`) without replacing it. Keyboard users need to know where they are.
-   **ARIA:** Attributes (like `aria-label`) to give extra context to screen readers when HTML fails.
