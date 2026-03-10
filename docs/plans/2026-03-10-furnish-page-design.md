# Furnish Page Design

**Date**: 2026-03-10
**Status**: Approved

## Overview

Build a dedicated `/furnish` page for RokVilla, mirroring the Design page architecture with furnish-specific sections. Full-screen hero, project gallery with room-type filters, design themes grid, key features, material specifications, and shared components (consultation form, testimonials, FAQ) refactored to accept props.

## Sections (in order)

### 1. FurnishHero
- Full-screen `h-dvh` with `VideoBackground` (existing pattern)
- Headline: "LET'S FURNISH YOUR ROK-VILLA"
- Staggered Framer entrance (heroItemVariants)
- CTA button scrolling to consultation form
- Image: existing project interior photo

### 2. HowItWorksSection
- 3-step horizontal layout: numbered circles connected by arc/line
- Steps: Browse Designs → Choose Themes → Connect With Us
- Animated stagger entrance
- Background: `bg-white`

### 3. ProjectsGallerySection
- Subheading: "End-to-End Interior Solutions"
- Room-type filter icons: Kitchen, Living Room, Bedroom, Bathroom, Dining, Pooja Room
- ProjectCard pattern (4:3, gradient overlay)
- Mobile: horizontal scroll, Desktop: 3-col grid
- Placeholder data (3-6 projects)
- Background: `bg-white`

### 4. DesignThemesSection
- Grid of themed interior cards
- Themes: Contemporary, Minimalist, Traditional, Industrial, Scandinavian, Bohemian
- Card pattern with image + theme name overlay
- Mobile: horizontal scroll, Desktop: 3-col grid
- Background: `bg-parchment`

### 5. KeyFeaturesSection
- 6 feature cards in 3×2 grid
- Cards: Inhouse Team, Free Estimation, Vastu Compliant, Free Interior Design, Daily Site Updates, 10 Years Warranty
- Colored accent styling (terracotta tones)
- Background: `bg-white`

### 6. MaterialFeaturesSection
- 4 cards: Wet Areas (BWP/Century), Dry Areas (MR/MDF), Shutter (HDHMR/Action Tesa), Hinges (HETTICH)
- Display-only with material images and brand names
- Background: `bg-parchment`

### 7. ConsultationForm (shared)
- Refactored to accept props: title, subtitle, serviceType
- "You Dream. We Deliver." with furnish-specific subtitle
- Background: `bg-white`

### 8. TestimonialsSection (shared)
- Accepts testimonials data as prop
- Furnish-specific testimonials from constants/furnish.ts
- Background: `bg-white`

### 9. FAQSection (shared)
- Accepts faqs/categories as props
- Categories: Materials & Quality, Process & Timeline, Pricing & Warranty, Customization
- Background: `bg-parchment`

## File Structure

```
src/
  app/(main)/furnish/page.tsx
  components/furnish/
    FurnishHero.tsx
    HowItWorksSection.tsx
    ProjectsGallerySection.tsx
    DesignThemesSection.tsx
    KeyFeaturesSection.tsx
    MaterialFeaturesSection.tsx
  components/shared/
    ConsultationForm.tsx          (moved from design/)
    TestimonialsSection.tsx       (moved from design/)
    FAQSection.tsx                (moved from design/)
  lib/constants/furnish.ts
```

## Navigation Updates

- Navigation.tsx: Add "Furnish" to LEFT_LINKS
- MenuOverlay.tsx: Add "Furnish" to MENU_LINKS
- constants/services.ts: Update furnish href to `/furnish`

## Design Decisions

- **Reuse over duplication**: Shared components refactored with props, not duplicated
- **Room-type filters**: Kitchen, Living Room, Bedroom, Bathroom, Dining, Pooja Room (standard for Indian interior firms)
- **Material cards**: Display-only, no external links (keeps users on-site)
- **FAQ content**: Furnishing-specific (materials, timelines, warranties, process)
- **Design themes**: Placeholder data with professional names, to be updated with real images
