export default function Newsletter() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get updates on upcoming events, community stories, and volunteering
            opportunities.
          </p>
        </div>
        <div className="card p-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
            />
            <button
              type="submit"
              className="btn-primary px-8"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
// Newsletter subscription form
