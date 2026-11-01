import Image from 'next/image';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1593028279220-e4a6dd7277d3?w=600&q=80', alt: 'Tree plantation' },
  { src: 'https://images.unsplash.com/photo-1542601907990-ef1a3ba71b6b?w=600&q=80', alt: 'Community cleanup' },
  { src: 'https://images.unsplash.com/photo-1518279681452-24cb7791811e?w=600&q=80', alt: 'Food distribution' },
  { src: 'https://images.unsplash.com/photo-1574347057969-3e6e595089ba?w=600&q=80', alt: 'Clothing donation' },
  { src: 'https://images.unsplash.com/photo-1593130062019-7da4c5e6e6c1?w=600&q=80', alt: 'Community garden' },
  { src: 'https://images.unsplash.com/photo-1586353352519-9cbbadf995c4?w=600&q=80', alt: 'Beach cleanup' },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-white dark:bg-[#0f1b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white mb-3">
            Community Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Moments of impact from our volunteers
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative h-48 overflow-hidden rounded-xl group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-forest-500/0 group-hover:bg-forest-500/20 transition-colors flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Community gallery static images
