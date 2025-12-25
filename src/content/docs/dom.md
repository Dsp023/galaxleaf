---
title: The DOM (Document Object Model)
description: The bridge between HTML and JavaScript.
category: Core Concepts (Frontend)
---

# The Document Object Model (DOM)

## What is the DOM?

The **DOM** is a programming interface for web documents. When a browser loads an HTML page, it creates a tree structure representing every element, attribute, and text node.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1 id="header">Hello World</h1>
    <p class="text">This is a paragraph.</p>
  </body>
</html>
```

Becomes this tree:
```
Document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1#header
        │   └── "Hello World"
        └── p.text
            └── "This is a paragraph."
```

## Accessing Elements

```javascript
// By ID
const header = document.getElementById('header');

// By class
const paragraphs = document.getElementsByClassName('text');

// By tag
const allDivs = document.getElementsByTagName('div');

// Modern selectors (CSS-like)
const el = document.querySelector('#header');  // First match
const all = document.querySelectorAll('.text'); // All matches
```

## Modifying the DOM

### Changing Content
```javascript
// Text content
element.textContent = 'New text';

// HTML content (dangerous!)
element.innerHTML = '<strong>Bold text</strong>';

// Safer alternative
const strong = document.createElement('strong');
strong.textContent = 'Bold text';
element.appendChild(strong);
```

### Changing Styles
```javascript
element.style.color = 'red';
element.style.fontSize = '20px';

// Better: Use classes
element.classList.add('highlight');
element.classList.remove('hidden');
element.classList.toggle('active');
```

### Creating Elements
```javascript
// Create
const div = document.createElement('div');
div.textContent = 'New div';
div.className = 'box';

// Add to page
document.body.appendChild(div);

// Insert at specific position
parent.insertBefore(newElement, referenceElement);
```

### Removing Elements
```javascript
// Remove self
element.remove();

// Remove child
parent.removeChild(child);
```

## Event Handling

```javascript
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event:', event);
    event.preventDefault(); // Stop default action
});

// Event delegation (efficient for many elements)
document.body.addEventListener('click', function(e) {
    if (e.target.matches('.delete-btn')) {
        e.target.closest('.item').remove();
    }
});
```

## Performance: Reflow and Repaint

### Reflow (Layout)
Occurs when geometry changes (width, height, position).
**Expensive!** Browser recalculates layout.

Triggers:
- Changing width/height
- Adding/removing elements
- Changing fonts
- `offsetWidth`, `clientHeight` (reading triggers reflow!)

### Repaint (Paint)
Occurs when visual properties change (color, visibility).
**Cheaper** than reflow.

### Optimization

```javascript
// ❌ BAD: Multiple reflows
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = i;
    document.body.appendChild(div); // Reflow each time!
}

// ✅ GOOD: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = i;
    fragment.appendChild(div); // No reflow
}
document.body.appendChild(fragment); // One reflow

// ✅ BETTER: Batch style changes
const el = document.getElementById('box');
el.style.cssText = 'width: 100px; height: 100px; background: red;';
```

## Common Pitfalls

### 1. Live vs Static Collections
```javascript
// Live (updates automatically)
const live = document.getElementsByTagName('div');
console.log(live.length); // 5

document.body.appendChild(document.createElement('div'));
console.log(live.length); // 6 (updated!)

// Static (snapshot)
const static = document.querySelectorAll('div');
console.log(static.length); // 6

document.body.appendChild(document.createElement('div'));
console.log(static.length); // Still 6
```

### 2. Reading Layout Properties
```javascript
// Forces synchronous reflow
const height = element.offsetHeight;
element.style.height = (height + 10) + 'px';

// Better: Read all, then write all
const h1 = el1.offsetHeight;
const h2 = el2.offsetHeight;
el1.style.height = (h1 + 10) + 'px';
el2.style.height = (h2 + 10) + 'px';
```

## Modern APIs

### Intersection Observer
```javascript
// Detect when element enters viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.lazy').forEach(el => {
    observer.observe(el);
});
```

### Mutation Observer
```javascript
// Watch for DOM changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        console.log('DOM changed:', mutation);
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
```

## Virtual DOM Comparison

**Direct DOM manipulation:**
```javascript
document.getElementById('count').textContent = count;
// Directly modifies browser DOM
```

**Virtual DOM (React):**
```javascript
const [count, setCount] = useState(0);
return <div>{count}</div>;
// React updates virtual representation
// Compares with previous
// Batches real DOM updates
```

**Why React is faster for complex UIs:**
- Batches multiple updates
- Minimizes reflows
- Only updates changed parts

**When direct DOM is faster:**
- Simple updates
- Small apps
- No complex state management

## Further Reading

- [MDN: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [DOM Performance](https://web.dev/dom-size/)
- [Event Handling Best Practices](https://javascript.info/event-delegation)
