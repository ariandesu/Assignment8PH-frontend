'use client';

export const dynamic = 'force-dynamic';

import { getRecentEvents } from '@/lib/api';
import Hero from '@/components/home/Hero';
import ImpactStats from '@/components/home/ImpactStats';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import Gallery from '@/components/home/Gallery';
import Newsletter from '@/components/home/Newsletter';

export default async function HomePage() {
  let events = [];
  try {
    const data = await getRecentEvents();
    events = data.events || [];
  } catch (err) {
    console.error('Failed to fetch featured events:', err);
  }

  return (
    <div className="space-y-0">
      <Hero />
      <ImpactStats />
      <FeaturedEvents events={events} loading={!events.length} />
      <Gallery />
      <Newsletter />
    </div>
  );
}
