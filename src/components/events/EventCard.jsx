import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event._id}`} className="block group">
      <div className="card h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-[#16221c]/90 backdrop-blur border border-white/50">
            <span className="text-xs font-medium text-forest-700 dark:text-forest-200 uppercase">
              {event.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-1 group-hover:text-forest-500 dark:group-hover:text-forest-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-medium text-forest-600 dark:text-forest-300 flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              {event.participantCount || 0} volunteers
            </span>
            <span className="text-xs font-semibold text-white bg-forest-500 px-2.5 py-1 rounded-lg uppercase tracking-tighter">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
