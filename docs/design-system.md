# DESIGN SYSTEM — IMAGE TOOLS

A professional, high-clarity design system for utility-focused SaaS applications.

---

## 1. Design Principles

1. **Tool-First Focus**: The interface gets out of the way. Controls, previews, and actions take center stage.
2. **High Information Density with Generous Whitespace**: Crisp text, distinct separation lines, no unnecessary visual clutter or distracting background ornaments.
3. **Tactile Feedback**: Interactive elements clearly communicate hover, focus, active, loading, and disabled states.
4. **Anti-Slop Cleanliness**: No purple-to-blue neon gradients, no arbitrary glowing drop-shadows, no ungrounded cards-inside-cards.

---

## 2. Semantic Color Palette

All UI components must adhere strictly to these semantic color tokens:

| Token Name | Tailwind Class | Hex Value | Purpose |
|---|---|---|---|
| **Background** | `bg-slate-50` / `bg-[#f8fafc]` | `#F8FAFC` | Page canvas background (clean, warm off-white) |
| **Surface** | `bg-white` / `bg-[#ffffff]` | `#FFFFFF` | Primary cards, panels, upload dropzones |
| **Surface Subdued** | `bg-slate-100` | `#F1F5F9` | Inner option wells, preset tags, disabled regions |
| **Border** | `border-slate-200` | `#E2E8F0` | Structural dividers, card borders, input borders |
| **Border Strong** | `border-slate-300` | `#CBD5E1` | Hovered borders, active form boundaries |
| **Text Primary** | `text-slate-900` | `#0F172A` | Headings, primary labels, core data metrics |
| **Text Muted** | `text-slate-500` | `#64748B` | Secondary explanations, subheadings, unit markers |
| **Primary** | `bg-blue-600` / `text-blue-600` | `#2563EB` | Primary CTA buttons, active radio tabs, focus rings |
| **Primary Hover** | `bg-blue-700` | `#1D4ED8` | Primary button hover state |
| **Primary Light** | `bg-blue-50` | `#EFF6FF` | Active selection pills, informational badges |
| **Success** | `emerald-600` / `bg-emerald-50` | `#059669` | Savings percentage indicator, download ready |
| **Warning** | `amber-600` / `bg-amber-50` | `#D97706` | Approaching quality loss warning, file size alert |
| **Error** | `rose-600` / `bg-rose-50` | `#E11D48` | Invalid file type, file decoding failure |

---

## 3. Typography Scale

Font Family: Clean modern system sans-serif (`font-sans` — Inter / system UI fallbacks).

| Role | Tailwind Classes | Size / Line-height | Tracking & Weight |
|---|---|---|---|
| **Display Hero** | `text-4xl sm:text-5xl font-extrabold` | 36px / 48px (mobile)<br>48px / 56px (desktop) | `tracking-tight font-extrabold` |
| **H1 (Tool Page)** | `text-2xl sm:text-3xl font-bold` | 24px - 30px | `tracking-tight font-bold text-slate-900` |
| **H2 (Section Header)**| `text-xl sm:text-2xl font-semibold`| 20px - 24px | `tracking-tight font-semibold text-slate-900` |
| **H3 (Card Header)** | `text-lg font-semibold` | 18px / 24px | `font-semibold text-slate-800` |
| **Body Large** | `text-lg text-slate-600` | 18px / 28px | `font-normal leading-relaxed` |
| **Body (Default)** | `text-base text-slate-600` | 16px / 24px | `font-normal leading-relaxed` |
| **Small / Caption** | `text-sm text-slate-500` | 14px / 20px | `font-normal` |
| **Data Metric** | `text-2xl font-bold text-slate-900`| 24px / 28px | `font-bold tabular-nums` |
| **Button Label** | `text-sm sm:text-base font-medium` | 14px - 16px | `font-medium whitespace-nowrap` |

---

## 4. Spacing Scale

Rhythmic spacing based on 4px units:
- `space-y-2` (8px): Tight list items, badge gaps.
- `space-y-4` (16px): Input groups, control rows.
- `space-y-6` (24px): Card contents, secondary tool blocks.
- `space-y-8` (32px): Major component sections.
- `py-12 sm:py-16` (48px - 64px): Hero and section vertical paddings.

Container Padding Rules:
- Cards: `p-6` (24px) on desktop, `p-4` (16px) on mobile.
- Outer container max width: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## 5. Border Radius & Shadows

### Border Radius
- Subtle/Inputs: `rounded-md` (6px) or `rounded-lg` (8px).
- Cards & Containers: `rounded-xl` (12px) or `rounded-2xl` (16px).
- Badges & Pills: `rounded-full` (9999px).

### Shadows
- Default Card: `shadow-xs border border-slate-200`
- Elevated / Active: `shadow-sm border border-slate-300`
- Dropzone Drag-Over: `border-2 border-dashed border-blue-500 bg-blue-50/50`
- Strictly avoid heavy diffuse 24px blur drop shadows.

---

## 6. Button Variants

1. **Primary**:
   - `bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 font-medium px-5 py-2.5 rounded-lg transition-colors shadow-xs`
2. **Secondary / Outline**:
   - `bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 font-medium px-4 py-2 rounded-lg transition-colors`
3. **Ghost**:
   - `text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium px-3 py-1.5 rounded-md transition-colors`
4. **Success (Download)**:
   - `bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 font-semibold px-6 py-3 rounded-lg transition-colors shadow-xs`
