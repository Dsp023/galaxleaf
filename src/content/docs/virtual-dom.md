---
title: Virtual DOM
description: React's secret to speed.
category: Core Concepts (Frontend)
---

# Virtual DOM: Reconciliation at Scale

## The Problem

Direct DOM manipulation is slow:

```javascript
// Update 100 items
items.forEach(item => {
    const div = document.getElementById(`item-${item.id}`);
    div.querySelector('.title').textContent = item.title;
    div.querySelector('.price').textContent = `$${item.price}`;
    // Triggers reflow for EACH item!
});
```

**Why slow?**
- Each change triggers reflow/repaint
- Layout calculations are expensive
- No batching

## The Solution: Virtual DOM

A **JavaScript object representation** of the real DOM.

```javascript
// Virtual DOM (just objects!)
const vdom = {
    type: 'div',
    props: { className: 'container' },
    children: [
        { type: 'h1', props: {}, children: ['Hello'] },
        { type: 'p', props: {}, children: ['World'] }
    ]
};

// Real DOM (browser objects)
<div class="container">
    <h1>Hello</h1>
    <p>World</p>
</div>
```

## How It Works

### 1. Render Virtual DOM
```javascript
function render(state) {
    return {
        type: 'div',
        children: [
            { type: 'h1', children: [state.title] },
            { type: 'p', children: [state.count] }
        ]
    };
}

const vdom1 = render({ title: 'Counter', count: 0 });
```

### 2. Diff Against Previous
```javascript
const vdom2 = render({ title: 'Counter', count: 1 });

// Compare vdom1 vs vdom2
// Find: <p> text changed from "0" to "1"
// Everything else same!
```

### 3. Apply Minimal Changes
```javascript
// Only update what changed
document.querySelector('p').textContent = '1';
// NOT re-rendering the entire UI
```

## Reconciliation Algorithm

React's diffing algorithm is **O(n)** instead of naive **O(n³)**:

### Rules:
1. **Different types = replace entirely**
   ```jsx
   <div>Hello</div>  →  <span>Hello</span>
   // Unmount div, mount span
   ```

2. **Same type = update props**
   ```jsx
   <div className="old">  →  <div className="new">
   // Keep element, update class
   ```

3. **Keys identify list items**
   ```jsx
   {items.map(item => <div key={item.id}>{item.name}</div>)}
   // React knows which items moved/changed
   ```

## Example: Simple Implementation

```javascript
function createElement(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }
    
    const el = document.createElement(vnode.type);
    
    // Set props
    Object.entries(vnode.props || {}).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });
    
    // Add children
    (vnode.children || []).forEach(child => {
        el.appendChild(createElement(child));
    });
    
    return el;
}

function diff(oldVNode, newVNode) {
    // Different type? Replace
    if (oldVNode.type !== newVNode.type) {
        return { type: 'REPLACE', newVNode };
    }
    
    // Check props
    const propsPatches = [];
    Object.keys({...oldVNode.props, ...newVNode.props}).forEach(key => {
        if (oldVNode.props[key] !== newVNode.props[key]) {
            propsPatches.push({ key, value: newVNode.props[key] });
        }
    });
    
    // Check children (simplified)
    const childPatches = []; // Recursively diff children...
    
    return { type: 'UPDATE', propsPatches, childPatches };
}

function patch(dom, patches) {
    // Apply patches to real DOM
    if (patches.type === 'REPLACE') {
        const newEl = createElement(patches.newVNode);
        dom.parentNode.replaceChild(newEl, dom);
    } else if (patches.type === 'UPDATE') {
        patches.propsPatches.forEach(p => {
            dom.setAttribute(p.key, p.value);
        });
        // Apply child patches...
    }
}
```

## React Example

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}

// On state change:
// 1. React re-renders component (creates new VDOM)
// 2. Diffs new VDOM vs old VDOM
// 3. Finds: <h1> text changed
// 4. Updates ONLY that text node in real DOM
```

## Keys in Lists

```jsx
// ❌ BAD: No keys
{items.map(item => <li>{item.name}</li>)}
// React can't track which item is which
// Removes last, re-renders all

// ✅ GOOD: Stable keys
{items.map(item => <li key={item.id}>{item.name}</li>)}
// React knows item identities
// Efficiently moves/updates specific items

// ⚠️ AVOID: Index as key
{items.map((item, i) => <li key={i}>{item.name}</li>)}
// Breaks if list reorders
```

## Performance Trade-offs

### Virtual DOM Overhead

```javascript
// Memory: Store virtual tree in RAM
// CPU: Diffing algorithm runs O(n)
// Still faster than naive DOM for complex UIs
```

### When Direct DOM Wins

```javascript
// Simple app: Just update one element
document.getElementById('time').textContent = new Date().toLocaleTimeString();
// Faster than VDOM overhead
```

## Beyond React

### Svelte: No Virtual DOM
```svelte
<script>
    let count = 0;
</script>

<h1>{count}</h1>
<button on:click={() => count++}>+</button>

<!-- Compiler converts to:
     Direct DOM updates (no diffing)
     Even faster, but less flexible
-->
```

### Solid.js: Fine-Grained Reactivity
```jsx
const [count, setCount] = createSignal(0);

<h1>{count()}</h1>
// Tracks dependencies at compile time
// Updates only exact DOM node (no diffing)
```

## The Verdict

**Virtual DOM:**
✅ Makes complex UIs manageable  
✅ Declarative syntax  
✅ Cross-platform (React Native)

❌ Overhead for simple updates  
❌ Memory usage

**Direct DOM:**
✅ Zero overhead  
✅ Maximum performance

❌ Imperative (harder to reason about)  
❌ Doesn't scale to complex UIs

## Further Reading

- [React Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- [Virtual DOM is Pure Overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
- [Lin Clark: VDOM Cartoon](https://hacks.mozilla.org/2017/09/building-the-dom-a-cartoon-intro/)
