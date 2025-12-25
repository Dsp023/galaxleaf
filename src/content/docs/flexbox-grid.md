---
title: Flexbox & Grid
description: Modern layout systems.
category: Styles
---

# Flexbox & Grid

## Flexbox (1-Dimensional)
Designed for laying out items in a **single row OR single column**.
-   **Use Cases:** Navbars, centering an item (`justify-center items-center`), aligning icons next to text.
-   **Key Logic:**
    -   `flex-direction`: Row or Column?
    -   `justify-content`: Alignment along the main axis.
    -   `align-items`: Alignment along the cross axis.

## CSS Grid (2-Dimensional)
Designed for laying out items in **rows AND columns** simultaneously.
-   **Use Cases:** Why whole page layouts, photo galleries, dashboard grids.
-   **Key Logic:**
    -   `grid-template-columns: 1fr 2fr 1fr`: Define strict columns.
    -   `gap`: Space between items.
    -   `grid-area`: Naming areas (Header, Sidebar, Main, Footer).

## Summary
-   Small scale components? **Flexbox**.
-   Big page layouts? **Grid**.
