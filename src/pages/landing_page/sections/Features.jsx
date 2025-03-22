import ducks from '../ducks.webp';

const Features = () => {
  return (
    <section className='min-h-screen'>
      <div className='max-w-5xl m-auto space-y-72'>
        <Feature>
          <Image src={ducks} />
          <Text
            feature='Dashboard'
            slug='Track all of your transaction in one place.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
        </Feature>
        <Feature>
          <Text
            feature='Transaction'
            slug='Record your income and expenses easily.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
          <Image src={ducks} />
        </Feature>
        <Feature>
          <Image src={ducks} />
          <Text
            feature='Category'
            slug='Freely categorize your income and expenses.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
        </Feature>
        <Feature>
          <Text
            feature='Activity'
            slug='Robust log activities tracking.'
            paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla possimus maiores placeat ex deserunt quidem dolore praesentium accusamus optio facilis.'
          />
          <Image src={ducks} />
        </Feature>
        <Feature>
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
  <img src={src} alt='ducks' className='rounded-lg max-w-md h-fit' />
);

const Text = ({ feature = '', slug = '', paragraph = '' }) => (
  <div className='max-w-md space-y-4'>
    <h6 className='font-bold text-blue-600'>{feature}</h6>
    <h2 className='text-4xl font-bold'>{slug}</h2>
    <p className='text-lg'>{paragraph}</p>
  </div>
);

const Feature = ({ children }) => (
  <div className='flex justify-between items-center'>{children}</div>
);

export default Features;
