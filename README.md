# CredVeda - Financial Transparency Platform

CredVeda is a financial awareness tool for the Indian loan payment ecosystem with smart EMI Reminders, loan comparison, and connection with trusted financial advisors.

## Features

- **Credit Profile Analysis**: AI-powered analysis using SHAP technology to reveal hidden credit strengths
- **Smart Payment Reminders**: WhatsApp and SMS alerts to never miss payment deadlines
- **Loan Comparison**: Side-by-side comparison of loan offers with transparent cost breakdown
- **Financial Advisor Network**: Connect with 500+ verified DSAs and NBFCs
- **Financial Transparency**: Empowering users with information rather than selling loans

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Site header with navigation
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features showcase
│   ├── Footer.tsx        # Site footer
│   └── ui/
│       ├── button.tsx    # Button component
│       └── card.tsx      # Card component
└── lib/
    └── utils.ts          # Utility functions
```

## Version History

### v1.1 - Bento Grid Layout Restructure
- **Major**: Restructured Features.tsx component with unified bento grid layout
- **Added**: New bentoItems array replacing separate features and stats arrays
- **Added**: Dynamic card types (feature, feature-with-image, stat, placeholder) for flexible grid layouts
- **Added**: Proper TypeScript definitions for bento grid items
- **Enhanced**: Grid layout with responsive column spanning (md:col-span-1, md:col-span-2)
- **Improved**: Component maintainability with single grid rendering instead of multiple sections

### v1.0.3 - Production Deployment
- **Fixed**: Resolved TypeScript errors with Framer Motion ease property
- **Deployed**: Successfully deployed to Vercel production environment
- **Live URL**: https://credveda-1-heawu0lhs-charitrajainofficial-gmailcoms-projects.vercel.app

### v1.0.2 - ESLint Fixes
- **Fixed**: Resolved ESLint errors with unescaped entities (quotes and apostrophes)
- **Fixed**: Removed unused imports from Features and Footer components

### v1.0.1 - Dependency Fix
- **Fixed**: Updated lucide-react to latest version for React 19 compatibility
- **Fixed**: Resolved npm install dependency conflicts for Vercel deployment

### v1.0.0 - Initial Release
- **Added**: Complete landing page with Hero, Features, and About Us sections
- **Added**: Responsive navigation with smooth scrolling
- **Added**: About Us section with financial transparency messaging
- **Added**: Features section showcasing key platform capabilities
- **Added**: Footer with social links and company information
- **Fixed**: Removed duplicate About Us sections
- **Fixed**: Updated About Us tag styling to match Features tag
- **Fixed**: Removed Contact Us navigation link (no corresponding section)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
