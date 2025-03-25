import { FaMagnifyingGlassChart } from 'react-icons/fa6';

const Benefits = () => {
  return (
    <section className='min-h-screen'>
      <div className='max-w-5xl grid gap-10 grid-cols-[repeat(auto-fit,minmax(384px,1fr))] m-auto'>
        <Card
          icon={<FaMagnifyingGlassChart />}
          title='Interactive Reports & Charts'
          text='Gain financial insights with easy-to-read visual data.'
        />
        <Card
          icon={<FaMagnifyingGlassChart />}
          title='Better Financial Control'
          text='Monitor and manage your cash flow in one simple app.'
        />
        <Card
          icon={<FaMagnifyingGlassChart />}
          title='Access Anytime, Anywhere'
          text='Use the app on your favorite devices hassle-free.'
        />
        <Card
          icon={<FaMagnifyingGlassChart />}
          title='Secure & Encrypted Data'
          text='Your financial information is protected with top security.'
        />
      </div>
    </section>
  );
};

const Card = ({ icon, title = '', text = '' }) => {
  return (
    <div className='card card-compact bg-transparent w-96 m-auto'>
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
