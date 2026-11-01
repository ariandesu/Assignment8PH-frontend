import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, HeartHandshake, Leaf, Shirt } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream dark:bg-[#0a0f0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 dark:bg-white/10 text-forest-600 dark:text-forest-200 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            Social Development Events Platform
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-900 dark:text-white leading-[1.1] mb-6">
            Small Actions.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-500 to-orange dark:from-forest-300">
              Stronger Communities.
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-10">
            Organise and join social service events in your neighbourhood, from winter clothes
            distribution in Mirpur to tree plantation and riverbank cleanups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/events" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/create-event" className="btn-outline inline-flex items-center justify-center">
              Create an Event
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start text-sm">
            {[
              { icon: Shirt, label: 'Clothes drives' },
              { icon: Leaf, label: 'Tree plantation' },
              { icon: HeartHandshake, label: 'Food & blood donation' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#16221c] border border-sage dark:border-white/10 text-forest-600 dark:text-gray-200">
                <Icon className="w-4 h-4" /> {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80"
              alt="Volunteers packing donation boxes together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
          </div>
          <div className="absolute -bottom-5 left-5 sm:left-8 flex items-center gap-3 p-4 bg-white dark:bg-[#16221c] rounded-2xl shadow-xl border border-sage/60 dark:border-white/10">
            <span className="w-11 h-11 rounded-full bg-orange flex items-center justify-center text-xl">🤝</span>
            <div>
              <p className="text-sm font-bold text-forest-900 dark:text-white">Volunteer-led, free to join</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Every event is organised by a neighbour</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
