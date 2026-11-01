export default function Footer() {
  return (
    <footer className="bg-forest-500 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">🌱</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Kindora</span>
            </div>
            <p className="text-sage/50 text-sm max-w-xs">
              Connecting volunteers, organizers, and local communities through
              social development activities. Small Actions. Stronger Communities.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-sage/60">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">Upcoming Events</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Create Account</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-sage/60">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-xs">f</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-xs">in</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-xs">X</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sage/60">
            © {new Date().getFullYear()} Kindora. All rights reserved.
          </p>
          <p className="text-xs text-sage/50">
            A community-driven platform for social development and service.
          </p>
        </div>
      </div>
    </footer>
  );
}
/* Footer responsive styles */
