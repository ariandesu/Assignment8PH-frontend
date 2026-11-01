import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import Gallery from '@/components/home/Gallery';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}
