import login from '../assets/features/login.png';
import dashboard from '../assets/features/dashboard.jpeg';
import category from '../assets/features/category.jpeg';
import transactions from '../assets/features/transactions.jpeg';
import logs from '../assets/features/logs.jpeg';

const Features = () => {
  return (
    <section id='features' className='min-h-screen px-4 overflow-hidden'>
      <div className='max-w-5xl m-auto space-y-20 py-16'>
        <h2 className='text-5xl font-bold text-blue-500 leading-none'>
          Smart Features for Better Financial Management.
        </h2>
        <div className='space-y-20 lg:space-y-36'>
          <Feature className='flex-wrap'>
            <Image src={dashboard} />
            <Text
              feature='Dashboard'
              slug='Track all of your transaction in one place.'
              paragraph='Monitor all your transactions in one place, track income and expenses, and manage your budget with ease and clarity.'
              keyVisual='1'
            />
          </Feature>
          <Feature className='flex-wrap-reverse'>
            <Text
              feature='Transaction'
              slug='Record your income and expenses easily.'
              paragraph='Effortlessly track your income and expenses to stay organized and in control of your finances.'
              keyVisual='2'
            />
            <Image src={transactions} />
          </Feature>
          <Feature className='flex-wrap'>
            <Image src={category} />
            <Text
              feature='Category'
              slug='Freely categorize your income and expenses.'
              paragraph='Organize your finances effortlessly by categorizing your income and expenses as you like.'
              keyVisual='3'
            />
          </Feature>
          <Feature className='flex-wrap-reverse'>
            <Text
              feature='Activity'
              slug='Robust log activities tracking.'
              paragraph='Track all activities with a robust logging system, ensuring detailed records, transparency, and easy monitoring of changes in real time.'
              keyVisual='4'
            />
            <Image src={logs} />
          </Feature>
          <Feature className='flex-wrap'>
            <Image src={login} />
            <Text
              feature='Google'
              slug='Sync your account with google.'
              paragraph='Seamlessly sync your account with Google for easy access, secure backup, and a smoother experience across all your devices.'
              keyVisual='5'
            />
          </Feature>
        </div>
      </div>
    </section>
  );
};

const Image = ({ src }) => (
  <img src={src} alt='features' className='rounded-lg shadow-lg md:max-w-md mx-auto ' />
);

const Text = ({ feature = '', slug = '', paragraph = '', keyVisual }) => (
  <div className='max-w-md space-y-4 m-auto relative'>
    <h6 className='font-bold text-blue-500'>{feature}</h6>
    <h2 className='text-4xl font-bold'>{slug}</h2>
    <p className='text-lg'>{paragraph}</p>
    <h1 className='text-[400px] opacity-5 bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent leading-none font-bold absolute -top-20 lg:-top-28 left-1/2 -z-10'>
      {keyVisual}
    </h1>
  </div>
);

const Feature = ({ children, className = '' }) => (
  <div className={`flex justify-between gap-8 items-center ${className}`}>
    {children}
  </div>
);

export default Features;
