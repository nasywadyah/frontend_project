import ducks from '../ducks.webp';

const Features = () => {
  return (
    <section id='features' className='min-h-screen scroll-m-60 px-4'>
      <div className='max-w-5xl m-auto space-y-16 py-36'>
        <h1 className='text-5xl font-bold text-blue-500 leading-none'>
          Smart Features for Better Financial Management.
        </h1>
        <div className='space-y-36'>
          <Feature className='flex-wrap'>
            <Image src={ducks} />
            <Text
              feature='Dashboard'
              slug='Track all of your transaction in one place.'
              paragraph='Monitor all your transactions in one place, track income and expenses, and manage your budget with ease and clarity.'
            />
          </Feature>
          <Feature className='flex-wrap-reverse'>
            <Text
              feature='Transaction'
              slug='Record your income and expenses easily.'
              paragraph='Effortlessly track your income and expenses to stay organized and in control of your finances.'
            />
            <Image src={ducks} />
          </Feature>
          <Feature className='flex-wrap'>
            <Image src={ducks} />
            <Text
              feature='Category'
              slug='Freely categorize your income and expenses.'
              paragraph='Organize your finances effortlessly by categorizing your income and expenses as you like.'
            />
          </Feature>
          <Feature className='flex-wrap-reverse'>
            <Text
              feature='Activity'
              slug='Robust log activities tracking.'
              paragraph='Track all activities with a robust logging system, ensuring detailed records, transparency, and easy monitoring of changes in real time.'
            />
            <Image src={ducks} />
          </Feature>
          <Feature className='flex-wrap'>
            <Image src={ducks} />
            <Text
              feature='Google'
              slug='Sync your account with google.'
              paragraph='Seamlessly sync your account with Google for easy access, secure backup, and a smoother experience across all your devices.'
            />
          </Feature>
        </div>
      </div>
    </section>
  );
};

const Image = ({ src }) => (
  <img
    src={src}
    alt='ducks'
    className='rounded-lg w-23 md:max-w-md h-fit m-auto'
  />
);

const Text = ({ feature = '', slug = '', paragraph = '' }) => (
  <div className='max-w-md space-y-4 m-auto'>
    <h6 className='font-bold text-blue-500'>{feature}</h6>
    <h2 className='text-4xl font-bold'>{slug}</h2>
    <p className='text-lg'>{paragraph}</p>
  </div>
);

const Feature = ({ children, className = '' }) => (
  <div className={`flex justify-between gap-8 items-center ${className}`}>
    {children}
  </div>
);

export default Features;
