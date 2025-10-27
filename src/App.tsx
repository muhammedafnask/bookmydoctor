import Header from './components/Header';
import Hero from './components/Hero';
import SpecialtiesGrid from './components/SpecialtiesGrid';
import FeaturesSection from './components/FeaturesSection';
import FeaturedDoctors from './components/FeaturedDoctors';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <SpecialtiesGrid />
        <FeaturesSection />
        <FeaturedDoctors />
      </main>
      <Footer />
    </div>
  );
}

export default App;
