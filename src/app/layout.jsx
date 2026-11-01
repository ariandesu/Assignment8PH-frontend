import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Toaster } from 'sonner';
import '@/app/globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Kindora | Small Actions. Stronger Communities.',
  description: 'Discover community service events, create initiatives, and join volunteering activities.',
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <html lang="en" className="scroll-smooth">
          <body className="min-h-screen bg-cream text-forest-500 antialiased">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" richColors />
          </body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
