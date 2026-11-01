import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-forest-500 dark:bg-[#16221c] px-6 py-12 sm:px-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange/30 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-sage/20 blur-2xl" />
          <div className="relative">
            <span className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/15 flex items-center justify-center text-white">
              <Mail className="w-6 h-6" />
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-white">Stay in the Loop</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              A short monthly email with new events near you and stories from the volunteers behind them.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange"
              />
              <button type="button" className="px-8 py-3.5 rounded-xl bg-orange text-forest-900 font-semibold hover:brightness-95 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
