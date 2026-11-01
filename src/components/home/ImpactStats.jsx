export default function ImpactStats() {
  const stats = [
    { label: 'Events Organized', value: '0', icon: '📅' },
    { label: 'Volunteers Joined', value: '0', icon: '👥' },
    { label: 'Communities Supported', value: '0', icon: '🏘️' },
    { label: 'Upcoming Initiatives', value: '0', icon: '🌱' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0f1b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-forest-500/10 flex items-center justify-center mx-auto mb-4 text-xl">
                {stat.icon}
              </div>
              <h3 className="font-heading text-3xl font-bold text-forest-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
