import { FaMagnifyingGlassChart } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BiSolidHappy } from 'react-icons/bi';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Benefits = () => {
  return (
    <section className='min-h-screen'>
      <div className='max-w-5xl py-16 space-y-10 m-auto'>
        <h1 className='p-4 text-5xl font-bold text-blue-500 leading-none'>Take Control of Your Finances <br /> with Powerful Insights.</h1>
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
        <span className='p-4 text-4xl rounded-full w-fit h-fit text-blue-500 bg-whit shadow-lg'>
          {icon}
        </span>
        <h2 className='card-title'>{title}</h2>
        <p className='text-lg'>{text}</p>
      </div>
    </div>
  );
};

export default Benefits;
