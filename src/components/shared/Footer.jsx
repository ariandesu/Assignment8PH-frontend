import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

// The current X logo (not the old Twitter bird)
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);

const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com', Icon: FacebookIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com', Icon: LinkedInIcon },
  { name: 'X', href: 'https://x.com', Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="bg-forest-500 dark:bg-[#07110d] text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center text-lg">🌱</span>
              <span className="font-heading text-xl font-extrabold text-white">Kindora</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Connecting volunteers, organizers, and neighbourhoods through social development events.
              Small actions, stronger communities.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange hover:text-forest-900 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/events" className="hover:text-white">Upcoming Events</Link></li>
              <li><Link href="/create-event" className="hover:text-white">Create an Event</Link></li>
              <li><Link href="/joined-events" className="hover:text-white">My Joined Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Event Types</h4>
            <ul className="space-y-2 text-sm">
              {['Cleanup', 'Plantation', 'Donation', 'Blood Donation', 'Education'].map((c) => (
                <li key={c}>
                  <Link href={`/events?category=${encodeURIComponent(c)}`} className="hover:text-white">{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Mirpur 10, Dhaka 1216, Bangladesh</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> <a href="mailto:hello@kindora.org" className="hover:text-white">hello@kindora.org</a></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +880 1700-000000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Kindora. All rights reserved.</p>
          <p>Built for communities that show up for each other.</p>
        </div>
      </div>
    </footer>
  );
}
