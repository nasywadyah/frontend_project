import Benefits from './sections/Benefits';
import Features from './sections/Features';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import GuestLayout from './layouts/GuestLayout';
import Quote from './sections/Quote';
import Reviews from './sections/Reviews';

function Landing_Page() {
  return (
    <GuestLayout>
      <Hero />
      <Quote />
      <Benefits />
      <Features />
      <Reviews />
      <Footer />
    </GuestLayout>
  );
}

export default Landing_Page;
