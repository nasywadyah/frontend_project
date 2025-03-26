import { Link } from 'react-router-dom';
import Blob from '../assets/blob.png';
const Hero = () => {
  return (
    <section
      id='home'
      className='hero bg-white min-h-screen relative overflow-hidden'
    >
      <img
        src={Blob}
        alt=''
        className='absolute top-20 lg:top-0 lg:h-screen lg:-right-80'
      />
      <div className='hero-content max-w-5xl flex-col justify-between gap-x-20 gap-y-10 text-center lg:text-left lg:flex-row-reverse'>
        <img
          src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp'
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div className=''>
          <h1 className='text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-bold'>
            Powerful. Simple.
          </h1>
          <p className='py-6 lg:text-2xl   text-gray-600'>
            Everything your need to track your income and expenses for free.
          </p>
          <div className='space-x-2'>
            <Link
              to={'/sign-up'}
              className='btn btn-primary text-white lg:btn-lg bg-blue-500 border-none hover:bg-blue-800'
            >
              Get Started
            </Link>
            <a
              href='#benefits'
              className='btn btn-ghost lg:btn-lg text-blue-500'
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
