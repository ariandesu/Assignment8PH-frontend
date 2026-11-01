import { CalendarPlus, HandHeart, ShieldCheck, ListChecks, Search, MoonStar } from 'lucide-react';

const FEATURES = [
  {
    icon: CalendarPlus,
    title: 'Organise in Minutes',
    text: 'Post a cleanup, plantation or donation drive with a date, place and photo, and it appears for volunteers right away.',
  },
  {
    icon: HandHeart,
    title: 'One-Click Joining',
    text: 'Volunteers join an event with a single click, and organisers can see how many people are coming.',
  },
  {
    icon: ListChecks,
    title: 'Your Volunteer Calendar',
    text: 'Every event you join is collected in one place, sorted by date, so you never miss the day.',
  },
  {
    icon: Search,
    title: 'Find Causes Near You',
    text: 'Search by title, filter by event type or neighbourhood, and only see events that are still to come.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe by Design',
    text: 'Secure login and protected APIs mean only you can edit or remove the events you created.',
  },
  {
    icon: MoonStar,
    title: 'Day or Night',
    text: 'A light and dark theme that follows you across every page, comfortable on phone, tablet or desktop.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-[#0f1b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange mb-2">Why Kindora</p>
          <h2 className="section-title">Everything a Community Drive Needs</h2>
          <p className="section-subtitle mx-auto">From the first idea to the day itself, Kindora keeps organisers and volunteers on the same page.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6 h-full hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-2xl bg-sage dark:bg-forest-500/30 text-forest-500 dark:text-forest-200 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
