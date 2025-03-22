import google from './google.svg';
import Features from './sections/Features';
import Hero from './sections/Hero';
import NavBar from './sections/NavBar';

function Landing_Page() {
  return (
    <>
      <NavBar />
      <Hero />
      <Features/>
    </>
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
