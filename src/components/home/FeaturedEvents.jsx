import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function FeaturedEvents({ events = [], loading = false }) {
  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
              Featured Community Events
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col h-[400px]">
                <LoadingSkeleton className="h-48 mb-4" />
                <div className="flex-1">
                  <LoadingSkeleton className="h-3 w-3/4 mb-2" />
                  <LoadingSkeleton className="h-3 w-1/2 mb-3" />
                  <LoadingSkeleton className="h-3 w-3/4 mb-2" />
                  <LoadingSkeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
              Featured Community Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Discover upcoming social development events near you
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm font-medium text-forest-500 dark:text-white hover:text-forest-600 dark:hover:text-forest-400 flex items-center gap-1"
          >
            See all events <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="group block"
            >
              <div className="card h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#16221c]/90 backdrop-blur border border-white/50">
                    <span className="text-xs font-medium text-forest-700 dark:text-forest-200 uppercase">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-1 group-hover:text-forest-500 dark:group-hover:text-forest-400 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(event.eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-forest-600 dark:text-forest-300">
                      {event.participantCount || 0} volunteers
                    </span>
                    <span className="text-xs font-semibold text-white bg-forest-500 px-2.5 py-1 rounded-lg uppercase tracking-tighter">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
