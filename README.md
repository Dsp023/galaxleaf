# 🌿 Galaxleaf

**The Ultimate Tech Stack Explorer** - A curated, comprehensive catalog of the world's best engineering tools and an extensive technical knowledge base covering AI, Frontend, Backend, Security, and beyond.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 🛠️ Resource Explorer
- **Curated Collection:** 50+ handpicked development tools across 10+ categories
- **Smart Search:** Client-side real-time search with fuzzy matching and category filtering
- **Interactive UI:** Glassmorphic cards with smooth animations
- **Tool Discovery:** External tools with favicon previews + internal wiki concepts

### 📚 Comprehensive Wiki
- **Technical Guides** covering:
  - 🤖 **AI/ML:** Transformers, RAG, RLHF, Embeddings, Prompt Engineering
  - 🎨 **Frontend:** Event Loop, DOM, Virtual DOM, Hydration, Rendering Patterns
  - ⚙️ **Backend:** ACID, Microservices, SQL/NoSQL, CAP Theorem, Scaling
  - 🔒 **Security:** Encryption, Zero Trust, CIA Triad
  - 💻 **CS Fundamentals:** Big O, Data Structures, Algorithms, Design Patterns
  - 🚀 Plus: DevOps, Web3, Game Dev, Design principles

- **Rich Content:** 12,000+ lines of documentation with code examples, diagrams, and production patterns
- **Interactive Features:**
  - Table of Contents with smooth scrolling
  - Reading progress indicator
  - Syntax-highlighted code blocks
  - Mermaid diagram support
  - Dark mode optimized

### 🎯 User Experience
- **Smooth Animations:** Framer Motion + particle background effects
- **Responsive Design:** Mobile-first, works on all devices
- **Dark Mode:** System-aware theme switching
- **No Login Required:** Instant access to all content

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/galaxleaf.git
cd galaxleaf
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
galaxleaf/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage with particles
│   │   ├── resources/          # Resource explorer
│   │   └── wiki/               # Wiki page routes
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── ParticlesBackground.tsx
│   │   ├── ResourceCard.tsx
│   │   └── TableOfContents.tsx
│   ├── content/
│   │   └── docs/               # Markdown wiki files
│   ├── data/
│   │   └── resources.ts        # Curated tool catalog (Static Data Source)
├── public/                     # Static assets
├── tailwind.config.ts          # TailwindCSS config
├── next.config.ts              # Next.js config
└── package.json
```

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling & UI
- **[TailwindCSS 4.0](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set

### Content & Markdown
- **[@next/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx)** - MDX support
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[rehype](https://github.com/rehypejs/rehype)** - HTML processing
- **[remark](https://github.com/remarkjs/remark)** - Markdown processing
- **[Prism.js](https://prismjs.com/)** - Code syntax highlighting

## 🎨 Key Features Explained

### Particle Animation
Subtle, performance-optimized particle background on homepage:
- 30 floating particles with dynamic connections
- Theme-aware (adapts to dark/light mode)
- requestAnimationFrame for smooth 60fps
- Non-blocking (pointer-events-none)

### Resource Search
Real-time filtering with fuzzy matching:
- Search by tool name or description
- Filter by category (AI, Frontend, DevOps, etc.)
- Instant results with dropdown preview
- Distinguishes internal wiki vs external tools

### Wiki System
Markdown-based documentation with:
- Automatic table of contents generation
- Reading progress tracking
- Code syntax highlighting
- Mermaid diagrams for visualizations
- Responsive typography

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript errors
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/galaxleaf.git
git push -u origin main
```

2. **Deploy on Vercel:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Deploy! ✅

Your app will be live at `https://your-project.vercel.app`

## 🔧 Configuration

### Customization

**Update branding:**
- Logo: Edit `src/app/page.tsx` (Leaf icon)
- Colors: Modify `tailwind.config.ts`
- Content: Edit Markdown files in `src/content/docs/`

**Add new resources:**
- Edit `src/data/resources.ts`
- Follow existing structure (name, description, url, category, icon)

**Add new wiki pages:**
- Create `.md` file in `src/content/docs/`
- Add frontmatter (title, description, category)
- Reference in `resources.ts` under "Concepts"

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[Vercel](https://vercel.com/)** - Seamless deployment
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Lucide](https://lucide.dev/)** - Icon library
- All the amazing open-source projects featured in the catalog!

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**
