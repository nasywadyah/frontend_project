import google from './google.svg';
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

const GoogleBtn = () => {
  return (
    <button className='flex px-4 py-2 rounded bg-white text-black border-[#e5e5e5]'>
      <img src={google} alt='' />
      Login with Google
    </button>
  );
};

export default Landing_Page;
