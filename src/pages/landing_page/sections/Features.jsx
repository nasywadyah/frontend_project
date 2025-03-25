import ducks from '../ducks.webp';

const Features = () => {
  return (
    <section id='features' className='min-h-screen scroll-m-60 px-4'>
      <div className='max-w-5xl m-auto space-y-72 pb-72'>
        <Feature className='flex-wrap'>
          <Image src={ducks} />
          <Text
            feature='Dashboard'
            slug='Track all of your transaction in one place.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
        </Feature>
        <Feature className='flex-wrap-reverse'>
          <Text
            feature='Transaction'
            slug='Record your income and expenses easily.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
          <Image src={ducks} />
        </Feature>
        <Feature className='flex-wrap'>
          <Image src={ducks} />
          <Text
            feature='Category'
            slug='Freely categorize your income and expenses.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
        </Feature>
        <Feature className='flex-wrap-reverse'>
          <Text
            feature='Activity'
            slug='Robust log activities tracking.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
          <Image src={ducks} />
        </Feature>
        <Feature className='flex-wrap'>
          <Image src={ducks} />
          <Text
            feature='Google'
            slug='Sync your account with google.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
        </Feature>
      </div>
    </section>
  );
};

const Image = ({ src }) => (
  <img src={src} alt='ducks' className='rounded-lg md:max-w-md h-fit m-auto' />
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
