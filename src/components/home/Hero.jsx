import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full -z-10">
        <div className="mx-auto max-w-7xl h-[500px] w-full md:h-[700px]">
          <Image
            src="https://images.unsplash.com/photo-1593028279220-e4a6dd7277d3?w=1600&q=80"
            alt="Community volunteering"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-60 dark:opacity-40"
            priority
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-6 block animate-fade-in">
            Build a Better Tomorrow
          </span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-forest-900 dark:text-white leading-tight mb-6">
            Small Actions.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-500 to-orange-500">
              Stronger Communities.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
            Join, organize, and take part in social service events that make a
            real difference in people&rsquo;s lives. From winter clothing
            distribution to tree plantation and beach cleanup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="btn-primary px-8 py-4 text-lg"
            >
              Explore Events <ArrowRight className="w-4 h-4 inline ml-2" />
            </Link>
            <Link
              href="/create-event"
              className="btn-outline px-8 py-4 text-lg dark:border-white/30 dark:text-white dark:hover:bg-white/10"
            >
              Create an Event
            </Link>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="relative flex items-center gap-4 p-4 bg-white dark:bg-[#16221c] rounded-2xl shadow-lg border border-sage/50 max-w-xs mx-auto">
            <div className="w-12 h-12 rounded-full bg-forest-500 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                Join 120+ Local Volunteers
              </p>
              <p className="text-sm font-medium text-forest-900 dark:text-white">
                Making a difference together
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
