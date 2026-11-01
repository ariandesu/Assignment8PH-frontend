import Link from 'next/link';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import EventImage from '@/components/shared/EventImage';

export default function EventCard({ event }) {
  return (
    <article className="card h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <EventImage
          src={event.image}
          alt={event.title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-[#16221c]/90 backdrop-blur text-xs font-semibold text-forest-700 dark:text-forest-200 uppercase tracking-wide">
          <Tag className="w-3 h-3" /> {event.category}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1.5">
          <Calendar className="w-4 h-4 shrink-0 text-forest-500 dark:text-forest-300" />
          <span>{formatDate(event.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-5">
          <MapPin className="w-4 h-4 shrink-0 text-forest-500 dark:text-forest-300" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <Link href={`/events/${event._id}`} className="btn-primary mt-auto text-center text-sm">
          View Event
        </Link>
      </div>
    </article>
  );
}
