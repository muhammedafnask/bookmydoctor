import Header from '../components/Header';
import Hero from '../components/Hero';
import SpecialtiesGrid from '../components/SpecialtiesGrid';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedDoctors from '../components/FeaturedDoctors';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SpecialtiesGrid />
        <FeaturesSection />
        <FeaturedDoctors />
      </main>
      <Footer />
    </>
  );
}

