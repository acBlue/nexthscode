import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main>
          <Hero />
          <CategoryGrid />
          <Stats />
        </main>
        <Footer />
      </div>
  );
}