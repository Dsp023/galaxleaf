---
title: Hydration
description: Making static HTML interactive.
category: Core Concepts (Frontend)
---

# Hydration: Bringing Static Pages to Life

## The Concept

**Hydration** is the process where client-side JavaScript attaches to server-rendered HTML to make it interactive.

```
Server: Renders HTML → Browser: Shows content (fast FCP!)
↓
JavaScript loads → Attaches event listeners (hydration)
↓
Page becomes interactive
```

## Why Hydration Exists

### Server-Side Rendering (SSR) Flow

```jsx
// Server (Next.js)
function Page() {
    return <button onClick={() => alert('Hi')}>Click me</button>;
}

// Server renders to HTML string:
const html = renderToString(<Page />);
// "<button>Click me</button>"

// Browser receives:
<button>Click me</button>
// Visible! But onClick doesn't work yet...

// Client-side React hydrates:
hydrateRoot(document.getElementById('root'), <Page />);
// Now button is interactive!
```

## The Hydration Process

### 1. Server Renders
```javascript
// Server creates HTML
const html = `
<div id="root">
    <h1>Hello, Alice</h1>
    <button>Click me</button>
</div>
`;
```

### 2. Browser Displays
```
User sees content immediately!
FCP (First Contentful Paint): ~200ms
```

### 3. JavaScript Loads
```
bundle.js downloads...
```

### 4. React Hydrates
```javascript
// React reconstitutes component tree
const root = hydrateRoot(document.getElementById('root'), <App />);

// Compares VDOM to real DOM
// Attaches event listeners
// Now interactive!
```

## Hydration Errors

### Mismatch Warning

```
Warning: Text content does not match server-rendered HTML.
```

**Cause:** Server HTML ≠ Client render

```jsx
// ❌ WRONG
function Time() {
    return <div>{new Date().toLocaleTimeString()}</div>;
}

// Server: "10:30:15"
// Client (500ms later): "10:30:16"
// Mismatch!
```

**Fix:**
```jsx
// ✅ CORRECT: Only render after mount
function Time() {
    const [time, setTime] = useState(null);
    
    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
    }, []);
    
    return <div>{time || 'Loading...'}</div>;
}

// Server: "Loading..."
// Client: "Loading..." (match!) → then updates to current time
```

### Common Causes

```jsx
// 1. Random values
<div>{Math.random()}</div>

// 2. Browser-only APIs
<div>{window.innerWidth}</div>

// 3. localStorage/cookies
<div>{localStorage.getItem('theme')}</div>

// 4. Different formatting
<div>{new Intl.DateTimeFormat().format(date)}</div>
// Different locales on server/client

// Fix all: useEffect!
useEffect(() => {
    setBrowserValue(window.innerWidth);
}, []);
```

## Performance Implications

### The "Uncanny Valley"

```
Time   | What user sees
-------|--------------------------------
0ms    | HTML arrives (content visible)
500ms  | JavaScript downloaded
1000ms | Hydration starts
1500ms | Hydration complete (interactive!)
```

**Problem:** 0-1500ms = User sees UI but can't interact.  
Click button → Nothing happens (frustrating!)

### Solutions

#### 1. Progressive Hydration
```jsx
// Hydrate critical components first
hydrateRoot(<Header />);  // Navbar first
hydrateRoot(<Hero />);    // Then hero
hydrateRoot(<Footer />);  // Footer last
```

#### 2. Selective Hydration (React 18)
```jsx
<Suspense fallback={<Spinner />}>
    <Comments />  // Hydrates only when visible
</Suspense>
```

#### 3. Islands Architecture (Astro)
```astro
<!-- Static HTML -->
<header>
    <h1>My Site</h1>
</header>

<!-- Interactive "island" -->
<Counter client:load />

<!-- More static HTML -->
<footer>© 2024</footer>

<!-- Only Counter hydrates! -->
```

## Hydration in Different Frameworks

### Next.js
```jsx
// pages/index.js
export async function getServerSideProps() {
    const data = await fetchData();
    return { props: { data } };
}

export default function Page({ data }) {
    return <div>{data}</div>;
}

// Server: Renders with data
// Client: Hydrates (attaches React)
```

### Remix
```jsx
export async function loader() {
    return json(await fetchData());
}

export default function Route() {
    const data = useLoaderData();
    return <div>{data}</div>;
}

// Similar flow: SSR → Hydration
```

### SvelteKit
```svelte
<script>
    export let data;
</script>

<div>{data.message}</div>

<!-- SSR by default
     Hydrates automatically
-->
```

## Avoiding Hydration

### Static Site Generation (SSG)
```jsx
// No hydration needed for static content
export async function generateStaticParams() {
    return [{ slug: 'post-1' }, { slug: 'post-2' }];
}

// Build time: Generate HTML
// Runtime: Just serve HTML (no JS needed!)
```

### Partial Hydration
```jsx
// Only interactive parts use JavaScript
<article>
    <h1>Blog Post</h1>
    <p>Static content...</p>
    
    <LikeButton client:visible />  // Only this hydrates
</article>
```

## Debugging Hydration Issues

### 1. Check Console
```
React will warn about mismatches:
Warning: Expected server HTML to contain <div> in <span>.
```

### 2. Suppresswarning (Last Resort)
```jsx
<div suppressHydrationWarning>
    {Date.now()}
</div>
```

### 3. Use Hydration-Safe Patterns
```jsx
// Always safe: Same on server and client
<div>Static text</div>
<div>{{ name }}</div>  // Props from server

// Check environment
const isClient = typeof window !== 'undefined';
```

## The Future: Resumability

**Qwik Framework:**
```jsx
// Serializes state with HTML
// No hydration needed!
// "Resumes" where server left off
```

Traditional: SSR → Download JS → Reconstruct state → Hydrate  
Qwik: SSR → Serialize state → Resume instantly

## Further Reading

- [Patterns.dev: Hydration](https://www.patterns.dev/posts/ssr-hydration)
- [React 18: Selective Hydration](https://github.com/reactwg/react-18/discussions/37)
- [Islands Architecture](https://jasonformat.com/islands-architecture/)
- [Resumability (Qwik)](https://qwik.builder.io/docs/concepts/resumable/)
