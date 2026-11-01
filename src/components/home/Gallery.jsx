import Image from 'next/image';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80', alt: 'Hands holding a young sapling', caption: 'Tree Plantation' },
  { src: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80', alt: 'Volunteers collecting rubbish on a beach', caption: 'Beach Cleanup' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', alt: 'Smiling children at a community outreach day', caption: 'Children\'s Outreach' },
  { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', alt: 'Hands holding a donation', caption: 'Donation Drive' },
  { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', alt: 'Volunteer in a red volunteer shirt', caption: 'Volunteer Day' },
  { src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80', alt: 'Many hands forming a heart', caption: 'Community Spirit' },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-white dark:bg-[#0f1b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange mb-2">Gallery</p>
          <h2 className="section-title">Moments of Impact</h2>
          <p className="section-subtitle mx-auto">Snapshots from community service events organised by volunteers like you.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <figure key={img.caption} className="relative h-44 sm:h-56 overflow-hidden rounded-2xl group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-semibold">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
