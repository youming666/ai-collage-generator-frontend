# CLAUDE.md

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

2. **Grid Photo Split Tool** (`/split` - app/split/page.tsx)
   - Split single image into 4-grid (2×2) or 9-grid (3×3)
   - Customizable gap size between grid cells
   - Batch download or individual download

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

## UI Language

- **User-facing text**: English only
- **Code comments**: Chinese (中文)
- **Console logs**: Can be either

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
- Title includes primary + secondary keywords
- Description includes benefits + CTA
- Open Graph + Twitter cards configured
- All pages use semantic HTML (h1/h2 hierarchy)
