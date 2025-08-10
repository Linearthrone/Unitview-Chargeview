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