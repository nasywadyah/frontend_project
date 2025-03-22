import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='bg-white h-screen text-black grid place-content-center text-center space-y-6'>
      <h1 className='text-7xl font-bold text-slate-900'>Powerful. Simple.</h1>
      <p className='text-2xl text-slate-500'>
        Everything you need to track your incomes and expenses for free.
      </p>
      <div className='flex justify-center gap-2'>
        <Link
          to={'/sign-up'}
          className='py-3 px-6 text-lg rounded-lg bg-blue-600 hover:bg-blue-900 transition-all font-semibold text-white w-fit mt-2'
        >
          Get Started
        </Link>
        <Link
          to={'/sign-up'}
          className='py-3 px-6 text-lg rounded-lg text-blue-600 hover:text-blue-900 transition-all font-semibold w-fit mt-2'
        >
          Learn more
        </Link>
      </div>
    </section>
  );
};

export default Hero;
