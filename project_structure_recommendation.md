# Recommended Project Structure

Based on the analysis of the current codebase, here's a recommended project structure for a Next.js application with Firebase integration.

## Directory Structure

```
/
├── .firebaserc                  # Firebase project configuration
├── .gitignore                   # Git ignore file
├── apphosting.yaml              # Firebase App Hosting configuration
├── components.json              # Shadcn UI components configuration
├── firebase.json                # Firebase configuration
├── firestore.indexes.json       # Firestore indexes
├── firestore.rules              # Firestore security rules
├── next.config.js               # Next.js configuration (converted from .ts)
├── next-env.d.ts                # Next.js TypeScript declarations
├── package.json                 # Package configuration
├── package-lock.json            # NPM lock file
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project documentation
├── storage.rules                # Firebase Storage security rules
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── public/                      # Static assets
│   ├── favicon.ico              # Favicon
│   └── images/                  # Static images
├── src/                         # Source code
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── [...routes]/         # Other routes
│   ├── components/              # React components
│   │   ├── ui/                  # UI components
│   │   └── shared/              # Shared components
│   ├── lib/                     # Utility libraries
│   │   ├── firebase.ts          # Firebase initialization
│   │   └── utils.ts             # Utility functions
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   └── styles/                  # Global styles
└── .env.local                   # Environment variables (not in repo)
```

## Key Files to Create

### 1. Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // This is required to allow requests from the Firebase Studio development environment.
  allowedDevOrigins: ["https://*.cloudworkstations.dev"],
};

module.exports = nextConfig;
```

### 2. Firebase Configuration

```javascript
// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'unitview',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
```

### 3. Root Layout

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UnitView',
  description: 'UnitView Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

### 4. Home Page

```tsx
// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to UnitView</h1>
      <p className="text-xl mb-8">
        A Next.js application with Firebase integration
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          href="/dashboard" 
          className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          href="/about" 
          className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          About
        </Link>
      </div>
    </main>
  );
}
```

### 5. Fixed Firebase.json

```json
{
  "firestore": {
    "database": "unitview",
    "location": "nam5",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "apphosting": [
    {
      "backendId": "unitview",
      "rootDir": ".next",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "functions"
      ]
    }
  ],
  "storage": {
    "rules": "storage.rules"
  }
}
```

### 6. Environment Variables (.env.local)

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=unitview.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=unitview
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=unitview.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Package.json Script Updates

Update the scripts in package.json to use a consistent package manager:

### For npm:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit"
}
```

### For pnpm:

```json
"scripts": {
  "dev": "pnpm exec next dev --turbopack",
  "build": "pnpm exec next build",
  "start": "pnpm exec next start",
  "lint": "pnpm exec next lint",
  "typecheck": "pnpm exec tsc --noEmit"
}
```

## Implementation Steps

1. **Clean up the codebase**
   - Remove all malformed files
   - Fix configuration files

2. **Create directory structure**
   - Create the src directory and its subdirectories
   - Set up the app directory for Next.js App Router

3. **Configure Firebase**
   - Update firebase.json to remove duplicate entries
   - Create Firebase initialization code

4. **Set up environment variables**
   - Create .env.local file with Firebase configuration
   - Add .env.local to .gitignore

5. **Initialize the application**
   - Create basic pages and components
   - Set up authentication and data fetching