# CLAUDE.md
所有回复都使用中文，谢谢。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Collage Generator - A Next.js web application for creating 3D photo collages and grid layouts for social media. Features AI-powered background removal, 9-grid/4-grid photo splitting, and real-time parameter adjustments.

**Live URL**: https://ai-collage-generator-frontend.vercel.app
**Tech Stack**: Next.js 13 (App Router), TypeScript, Tailwind CSS, Canvas API, Modal API (background removal)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (required before deployment)
npm run build

# Start production server locally
npm start

# Lint code
npm run lint
```

## Architecture Overview

### Two Main Features

1. **AI Collage Generator** (`/` - app/page.tsx)
   - Upload 9 grid photos + 1 main photo
   - AI background removal via Modal API
   - Real-time parameter adjustments (scale, horizontal/vertical offset)
   - Canvas-based image composition with shadows
   - Daily quota system (5 generations/day via localStorage)
   - **Progress bar**: 90-second simulation, jumps to 100% on completion
   - **Marketing sections**: Hero, BeforeAfterGallery, HowItWorks, Features, UseCases, FAQ, CTASection

2. **Grid Photo Split Tool** (`/split` - app/split/page.tsx)
   - Split single image into 4-grid (2×2) or 9-grid (3×3)
   - Customizable gap size between grid cells
   - Batch download or individual download
   - **Marketing sections**: SplitHeroSection, SplitDemoGallery, SplitHowItWorks, SplitUseCases

### Page Structure Pattern

Both pages follow a consistent marketing-focused structure inspired by landing page best practices (e.g., Venngage):

**Main Page (`/`)**:
```
Hero → Before/After Gallery → How It Works → Tool Section → Features → Use Cases → FAQ → CTA → Footer
```

**Split Page (`/split`)**:
```
Hero → Demo Gallery → How It Works → Tool Section → Use Cases → Footer
```

**Key Components** (located in `components/`):
- Main page: `HeroSection`, `BeforeAfterGallery`, `HowItWorks`, `Features`, `UseCases`, `FAQ`, `CTASection`
- Split page: `SplitHeroSection`, `SplitDemoGallery`, `SplitHowItWorks`, `SplitUseCases`
- Shared: `Footer`, `Navigation`, `GoogleAnalytics`, `MicrosoftClarity`
- Context: `LanguageContext` (i18n system)

**Demo Assets** (`public/examples/`):
- `example-flower.jpeg`, `example-water.jpg` - Main feature examples
- `how-it-works.jpg` - Main page tutorial screenshot
- `split-demo-2x2.jpg`, `split-demo-3x3.jpg` - Split tool demos

### Mobile Responsiveness

**Preview Layout Fix** (app/page.tsx:593):
- Preview container uses `flex-1` with `aspectRatio: '3/4'` to maintain proper sizing
- Vertical slider uses `alignSelf: 'stretch'` to match preview height dynamically
- This prevents the preview area from being compressed when no image is uploaded

**Key responsive patterns**:
- `components/Navigation.tsx`: Hamburger menu with toggle state
- `app/layout.tsx`: Viewport meta tag with proper scaling
- `app/page.tsx`: Two-column layout switches to single column (`flex-col lg:flex-row`)
  - Vertical slider hidden on mobile (`hidden md:flex`), replaced with horizontal slider
- `app/split/page.tsx`: Responsive button layouts and image heights
- All marketing components: Use responsive grid cols (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4`)

**Breakpoints**: Uses Tailwind's `md:` (768px) and `lg:` (1024px) breakpoints

### Critical Algorithm: Offset Calculation

**Location**: `utils/imageProcessor.ts` - `compositeImage()`

The offset algorithm uses **movable range** as the basis (NOT canvas center):

```typescript
// Key principle: position based on movable range
const moveRangeX = Math.max(0, canvas.width - scaledWidth);
const moveRangeY = Math.max(0, canvas.height - scaledHeight);

const x = (params.offsetX / 100) * moveRangeX;  // 0-100% maps to 0-moveRange
const y = (params.offsetY / 100) * moveRangeY;
```

**Why**: This guarantees:
- 50% offset = perfectly centered
- Image never moves outside canvas boundaries
- Auto-adapts to any image/canvas size ratio

See `OFFSET_ALGORITHM.md` for detailed mathematical proof.

### API Architecture

**Endpoint**: `/api/remove-bg/route.ts`

5-layer security model:
1. **Origin validation** - CORS check against `ALLOWED_ORIGINS`
2. **API key validation** - `X-API-Key` header must match `API_SECRET_KEY`
3. **Rate limiting** - 10 requests per minute per client IP
4. **File validation** - Type, size (max 10MB)
5. **Modal API proxy** - Forwards to external Modal backend

**Important**: When adding new allowed origins, add to `ALLOWED_ORIGINS` array WITHOUT trailing slash.

### State Management Pattern

Uses localStorage for:
- Daily quota tracking (5/day limit)
- Generated image caching (to avoid re-calling Modal API)

**SSR Safety**: All localStorage access must check `typeof window === 'undefined'` to avoid errors during server-side rendering.

Example pattern:
```typescript
const checkDailyLimit = () => {
  if (typeof window === 'undefined') {
    return { canUse: true, remaining: 5 };
  }
  // ... localStorage logic
};
```

### Image Processing Pipeline

**utils/imageProcessor.ts** exports:

1. **Compression**: `compressImage()` - Binary search for optimal JPEG quality to reach target size
2. **Cropping**: `cropTransparentArea()` - Removes transparent borders from PNG
3. **Grid Creation**: `createNineGrid()` - Creates 3×3 grid with 10px white gaps
4. **Background**: `createBackground()` - 3:4 ratio (1080×1440), grid aligned bottom
5. **Composition**: `compositeImage()` - Combines background + main image with shadow
6. **Splitting**: `splitImageIntoGrid()` - Splits image into N×N cells
7. **Preview**: `createSplitPreview()` - Reassembles split images with gaps

## Environment Variables

Required for production (add to Vercel):

```bash
MODAL_API_URL=https://USERNAME--app-name.modal.run
API_SECRET_KEY=<generate with: openssl rand -hex 32>
NEXT_PUBLIC_API_SECRET_KEY=<same as API_SECRET_KEY>
```

**Modal API**: External service running separately (NOT part of this codebase). This app only calls it via HTTP.

## Common Pitfalls

1. **localStorage in SSR**: Always wrap with `typeof window === 'undefined'` check
2. **Offset algorithm**: Never modify to use canvas center as base - use moveRange
3. **Origin validation**: Remove trailing slashes from URLs in `ALLOWED_ORIGINS`
4. **TypeScript errors**: Use `as any` for browser-specific CSS properties like `WebkitAppearance`
5. **Image compression**: Already optimized before API call - don't compress twice
6. **Progress bar cleanup**: Always `clearInterval()` on success/error to prevent memory leaks
7. **Mobile vertical slider**: Must be hidden on mobile (`hidden md:flex`) - doesn't work on touch devices
8. **Preview layout**: Use `flex-1` + `aspectRatio` for preview container, `alignSelf: 'stretch'` for vertical slider to prevent compression
9. **Component imports**: Marketing components use Next.js `Image` component - remember to import from `next/image`
10. **Smooth scrolling**: Use `document.getElementById('section-id').scrollIntoView({ behavior: 'smooth' })` for CTA buttons
11. **i18n translation keys**: Always update BOTH `locales/en.json` and `locales/zh.json` when adding new UI text
12. **Client components for i18n**: Any component using `useLanguage()` hook must have `'use client'` directive
13. **Navigation dropdown**: Legal pages menu uses `onBlur` with `setTimeout(200ms)` to allow link clicks before closing

## Content & Design Guidelines

**Marketing Page Philosophy**: Follow Venngage-style landing page best practices:
- Lead with value proposition in Hero section
- Show before/after examples early (builds trust)
- Break down process into 3-4 simple steps
- Highlight 6 key features with icons and descriptions
- Include 3 detailed use cases targeting different user segments
- End with strong CTA that scrolls to tool section
- Use FAQ to address objections and improve SEO

**Visual Design Principles**:
- Generous white space between sections (`mb-20`)
- Gradient backgrounds for hero/CTA (`bg-gradient-to-r from-blue-600 to-purple-600`)
- Card hover effects (`hover:shadow-xl transition-all hover:scale-105`)
- Consistent color scheme: Blue (primary CTA), Green (success/trust), Purple (AI/premium)
- Icons: Use emoji for simplicity (📸, ✨, 🎨, etc.)

**Demo Images**: When adding new example images:
1. Place in `public/examples/` directory
2. Use descriptive filenames: `feature-name-description.jpg`
3. Use Next.js Image component with appropriate `sizes` prop
4. Add descriptive alt text for SEO

## Internationalization (i18n)

**Language Support**: Bilingual (English + Chinese)

**Architecture** (`contexts/LanguageContext.tsx`):
- Client-side React Context for global language state
- Automatic language detection based on browser language (`navigator.language`)
- Manual language switching via navigation bar toggle
- Persistent preference stored in localStorage (`preferred-language`)
- Detection logic: localStorage → browser language → default (English)

**Translation Files** (`locales/`):
- `en.json` - English translations (~530+ keys)
- `zh.json` - Chinese translations (~530+ keys)
- Structured with nested objects: `nav`, `hero`, `tool`, `features`, `faq`, `split`, `pages`

**Usage Pattern**:
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export default function Component() {
  const { t, language, setLanguage } = useLanguage();

  return <h1>{t.hero.title}</h1>;
}
```

**SSR Considerations**:
- All i18n components must use `'use client'` directive
- Legal pages (about/contact/privacy/disclaimer) use client-side SEO:
  - Dynamic `document.title` updates via `useEffect`
  - Dynamic meta tag injection via DOM manipulation
- Language detection only runs on client side (wrapped in `typeof window === 'undefined'` check)

**Important**: When adding new UI text, always add keys to BOTH `en.json` and `zh.json` to maintain parity.

## UI Language Conventions

- **User-facing text**: Bilingual (English/Chinese via i18n system)
- **Code comments**: Chinese (中文)
- **Console logs**: Can be either
- **Git commits**: Chinese (中文)

## Deployment

See `VERCEL_DEPLOYMENT.md` for complete Vercel setup.

Key points:
- Automatic deployment on push to `main` branch
- Must configure environment variables in Vercel dashboard first
- Build will fail if localStorage accessed during SSR
- Test `/split` page separately (different route)

## SEO Configuration

Optimized for keywords: "ai collage generator", "grid photo split", "photo grid maker"

**Meta tags location**: `app/layout.tsx`
- Uses `metadataBase` to fix Open Graph image URLs
- Title emphasizes "Free", "3D", "AI Background Removal"
- Description mentions "90 seconds", "No sign-up", "5 collages daily"
- Open Graph + Twitter cards configured
- All pages use semantic HTML (h1/h2 hierarchy)

**Content Strategy**:
- **Main page**: ~2500+ words of SEO-optimized content across all sections
- **Split page**: ~1500+ words targeting "photo grid split" keywords
- Natural keyword placement in headings, descriptions, and feature lists
- Long-tail keywords: "free 3D photo collage maker", "Instagram grid generator", "AI background remover for collage"

**Analytics integrated**:
- Google Analytics (G-R9EFMPXJ9Y) - `components/GoogleAnalytics.tsx`
- Microsoft Clarity (tsnl7vl1gt) - `components/MicrosoftClarity.tsx`
- Google AdSense (pub-9678673801172605) - Script in `<head>` + `public/ads.txt`

**Footer SEO**: Enhanced footer includes keyword-rich content:
- "About" section with long description
- "Keywords" tags displaying target search terms
- Additional paragraph at bottom with dense keyword usage

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
