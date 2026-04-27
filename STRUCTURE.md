## Project Structure Frontend

frontend/
├── app/
| ├── login/
│ └── page.tsx ← halaman login
│ ├── (public)/
│ ├── page.tsx
│ ├── components/
│ │ ├── Navbar.tsx
│ │ ├── SectionDivider.tsx
│ │ ├── HeroSection.tsx
│ │ ├── AboutSection.tsx
│ │ ├── SkillsSection.tsx
│ │ ├── ProjectsSection.tsx
│ │ ├── ExperienceSection.tsx
│ │ ├── ContactSection.tsx
│ ├── hooks/
│ │ ├── useScrollActive.ts
│ │ ├── useAnimationInView.ts
│ ├── styles/
│ │ ├── animations.css
│ │
│ ├── dashboard/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── profile/
| | | ├── page.tsx
│ │ ├── about/
| | | ├── page.tsx
│ │ ├── skills/
| | | ├── page.tsx
| | | ├── new/
| | | | ├── page.tsx
| | | ├── [id]/
| | | | ├── page.tsx
│ │ ├── projects/
| | | ├── page.tsx
| | | ├── new/
| | | | ├── page.tsx
| | | ├── [id]/
| | | | ├── page.tsx
│ │ ├── experience/
| | | ├── page.tsx
│ │ └── contact/
| | | ├── page.tsx
│ │
│ ├── api/ (optional nanti)
│ └── layout.tsx
│
├── components/
│ ├── layout/
│ ├── ui/
│ ├── public/
│ └── dashboard/
│
├── services/
├── types/
├── lib/
