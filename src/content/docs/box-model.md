---
title: Box Model
description: How CSS Elements are sized.
category: Styles
---

# The CSS Box Model

## The Onion Layers
Every element in HTML is a rectangular box. It has 4 layers (from inside out):

1.  **Content:** The actual text or image.
2.  **Padding:** The space between the content and the border. (Internal breathing room).
3.  **Border:** The line wrapping the padding.
4.  **Margin:** The space outside the border. Separates this element from neighbors.

## Box Sizing (The confusing part)
By default (`box-sizing: content-box`), if you set `width: 100px` and `padding: 20px`, the total width is **140px** (100 + 20 left + 20 right). This is annoying.

## The Fix
Always use:
```css
* {
  box-sizing: border-box;
}
```
With `border-box`, `width: 100px` includes the padding and border. The element stays 100px wide, and the content shrinks to fit.
