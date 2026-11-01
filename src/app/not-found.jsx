import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="font-heading text-7xl font-extrabold text-forest-500 dark:text-forest-300">404</p>
      <h1 className="section-title mt-4">Page Not Found</h1>
      <p className="section-subtitle mx-auto">The page you are looking for has moved or never existed.</p>
      <div className="flex justify-center gap-3 mt-8">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/events" className="btn-outline">Browse Events</Link>
      </div>
    </section>
  );
}
