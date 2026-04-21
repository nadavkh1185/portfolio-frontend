## Project Structure Frontend

frontend/
├── app/
| ├── login/
│ └── page.tsx ← halaman login
│ ├── (public)/
│ │ └── page.tsx
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
