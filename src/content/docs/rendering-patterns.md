---
title: Rendering Patterns
description: CSR, SSR, SSG, ISR explained.
category: Core Concepts (Frontend)
---

# Rendering Patterns: How Web Pages Get Built

## Client-Side Rendering (CSR)

### How It Works
```
1. Browser requests index.html
2. Server sends minimal HTML + JavaScript bundle
3. Browser downloads JS (loading...)
4. JS executes → Renders full page
5. Page becomes interactive
```

### Example (React)
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

```jsx
// App.jsx
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);
  
  return <div>{data ? data.title : 'Loading...'}</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Timeline
```
0ms    → HTML received (blank page)
500ms  → JS downloaded
1000ms → JS parsed & executed
1200ms → API call made
1500ms → Data received
1500ms → Page fully rendered ✅
```

### Pros
✅ Rich interactions  
✅ Fast subsequent navigation (SPA)  
✅ Reduced server load

### Cons
❌ Slow initial load (FCP: First Contentful Paint)  
❌ Bad SEO (crawlers see empty page)  
❌ Requires JavaScript

**Use When:** Internal dashboards, apps behind login

## Server-Side Rendering (SSR)

### How It Works
```
1. Browser requests /page
2. Server runs React, fetches data
3. Server renders HTML string
4. Browser displays content immediately ✅
5. JS downloads & hydrates
```

### Example (Next.js)
```jsx
// pages/post.jsx
export async function getServerSideProps(context) {
  const post = await fetchPost(context.params.id);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

### Timeline
```
0ms    → Request sent
200ms  → Server fetches data, renders HTML
200ms  → Browser displays content ✅ (Fast FCP!)
700ms  → JS downloads
1000ms → Hydration complete (interactive)
```

### Pros
✅ Fast FCP (content visible immediately)  
✅ SEO-friendly (crawlers see full HTML)  
✅ Works without JavaScript (mostly)

### Cons
❌ Server load (every request = render)  
❌ Slower Time to Interactive (TTI)  
❌ More complex infrastructure

**Use When:** Public content sites, e-commerce, blogs

## Static Site Generation (SSG)

### How It Works
```
Build Time:
1. Fetch all data
2. Render all pages to HTML
3. Save as static files

Request Time:
1. Serve pre-built HTML (instant!) ⚡
```

### Example (Next.js)
```jsx
// pages/post/[id].jsx
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map(p => ({ params: { id: p.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  return { props: { post } };
}

export default function Post({ post }) {
  return <h1>{post.title}</h1>;
}
```

### Build Process
```bash
$ npm run build
Building pages...
✓ /
✓ /about
✓ /posts/1
✓ /posts/2
...
Build complete! 100 pages generated.
```

### Timeline
```
0ms    → Request
50ms   → CDN serves HTML ⚡ (Blazing fast!)
500ms  → JS hydration
```

### Pros
✅ Lightning fast (CDN-cached HTML)  
✅ Cheap hosting (just static files)  
✅ SEO perfect

### Cons
❌ Long builds (1000 pages = slow)  
❌ Stale data (rebuild to update)  
❌ Not suitable for dynamic content

**Use When:** Documentation, marketing sites, blogs

## Incremental Static Regeneration (ISR)

### How It Works
```
1. Build: Generate most popular pages
2. Request: Serve cached page
3. Background: Regenerate if stale
4. Next request: Get fresh page
```

### Example (Next.js)
```jsx
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60  // Regenerate every 60 seconds
  };
}
```

### Timeline
```
User 1 (0s):    Requests /page → Gets cached HTML (stale)
                → Triggers rebuild in background
User 2 (65s):   Requests /page → Gets fresh HTML ✅
```

### Pros
✅ Fast like SSG  
✅ Fresh content (revalidates)  
✅ Scales to millions of pages

### Cons
⚠️ Complexity  
⚠️ First user sees stale content

**Use When:** E-commerce product pages, news sites

## Streaming SSR (React 18)

### How It Works
```
1. Server starts sending HTML immediately
2. Streams chunks as they're ready
3. Browser progressively renders
```

### Example
```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Header />  {/* Sent immediately */}
      
      <Suspense fallback={<Spinner />}>
        <Comments />  {/* Streamed when ready */}
      </Suspense>
    </div>
  );
}
```

### Timeline
```
0ms    → Header HTML sent → Browser displays!
200ms  → Comments loaded → Stream sent
200ms  → Browser updates (no full reload)
```

### Pros
✅ Ultra-fast FCP (stream starts immediately)  
✅ Prioritized content  
✅ No loading spinners on whole page

## Islands Architecture (Astro)

### Concept
```
[Static HTML]
    ↓
[Interactive Island 1]  ← Only this runs JS
    ↓
[Static HTML]
    ↓
[Interactive Island 2]  ← Only this runs JS
    ↓
[Static HTML]
```

### Example (Astro)
```astro
---
// Static by default
const posts = await fetchPosts();
---

<div>
  <h1>Blog</h1>
  
  {posts.map(post => (
    <article>{post.title}</article>
  ))}
  
  <!-- Only this component hydrates! -->
  <LikeButton client:load />
</div>
```

### Directives
```astro
<Component client:load />      <!-- Hydrate immediately -->
<Component client:idle />      <!-- Hydrate when idle -->
<Component client:visible />   <!-- Hydrate when visible -->
<Component client:only="react" /> <!-- Client-only, no SSR -->
```

### Pros
✅ Minimal JavaScript  
✅ Maximum performance  
✅ Best of both worlds

**Use When:** Content-heavy sites with interactive widgets

## Comparison

| Pattern | FCP | TTI | SEO | Server Cost | Fresh Data |
|---------|-----|-----|-----|-------------|------------|
| CSR | ❌ Slow | ✅ Good | ❌ Bad | ✅ Low | ✅ Always |
| SSR | ✅ Fast | ⚠️ Medium | ✅ Perfect | ❌ High | ✅ Always |
| SSG | ⚡ Instant | ✅ Fast | ✅ Perfect | ✅ Low | ❌ Build time |
| ISR | ⚡ Instant | ✅ Fast | ✅ Perfect | ⚠️ Medium | ⚠️ Delayed |

## Real-World Hybrid Example

```jsx
// Next.js App
export default function App() {
  return (
    <>
      {/* SSG */}
      <Header />  // Built at build time
      
      {/* SSR */}
      <UserProfile />  // Fetched on each request
      
      {/* CSR */}
      <LiveChat />  // Client-only, real-time
      
      {/* ISR */}
      <ProductRecommendations revalidate={3600} />
    </>
  );
}
```

## Decision Tree

```
Is content static?
├─ YES → SSG
└─ NO
    ├─ Need SEO?
    │   ├─ YES → SSR or ISR
    │   └─ NO → CSR
    └─ Millions of pages?
        └─ YES → ISR
```

## Further Reading

- [Rendering on the Web (Google)](https://web.dev/rendering-on-the-web/)
- [Next.js Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [Islands Architecture](https://jasonformat.com/islands-architecture/)

## Conclusion

No single pattern is best. Modern frameworks let you mix approaches per-page or even per-component. The trend is toward **progressive enhancement**: start with SSR/SSG for fast FCP and SEO, then hydrate interactive parts, and use CSR for highly dynamic features. Understanding these patterns lets you optimize for your specific use case: content sites lean toward SSG, dashboards use CSR, and e-commerce blends SSR/ISR.
