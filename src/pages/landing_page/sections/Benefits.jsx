import { FaMagnifyingGlassChart } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BiSolidHappy } from 'react-icons/bi';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Benefits = () => {
  return (
    <section id='benefits' className='min-h-screen relative overflow-hidden'>
      <div className='absolute aspect-square bg-gradient-to-b from-black to-transparent rounded-full top-[19rem] lg:-top-0 h-[120vh] lg:h-screen -left-1/2 lg:left-0 lg:-right-96 opacity-5' />
      <div className='max-w-5xl py-16 space-y-5 m-auto'>
        <h2 className='p-4 text-5xl font-bold text-blue-500 leading-none'>
          Take Control of Your Finances <br /> with Powerful Insights.
        </h2>
        <div className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(23rem,1fr))]'>
          <Card
            icon={<FaMagnifyingGlassChart />}
            title='Interactive Reports & Charts'
            text='Gain financial insights with easy-to-read visual data.'
          />
          <Card
            icon={<FaMoneyBillWave />}
            title='Better Financial Control'
            text='Monitor and manage your cash flow in one simple app.'
          />
          <Card
            icon={<BiSolidHappy />}
            title='Access Anytime, Anywhere'
            text='Use the app on your favorite devices hassle-free.'
          />
          <Card
            icon={<BsFillShieldLockFill />}
            title='Secure & Encrypted Data'
            text='Your financial information is protected with top security.'
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, title = '', text = '' }) => {
  return (
    <div className='card card-compact bg-transparent'>
      <div className='card-body'>
        <span className='p-4 text-4xl bg-white rounded-full w-fit h-fit text-blue-500 bg-whit shadow-lg'>
          {icon}
        </span>
        <h2 className='card-title'>{title}</h2>
        <p className='text-lg'>{text}</p>
      </div>
    </div>
  );
};

export default Benefits;
