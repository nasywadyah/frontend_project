import { useEffect, useRef } from 'react';
import AvatarOne from '../assets/avatar-1.jpeg';
import AvatarTwo from '../assets/avatar-2.jpeg';
import AvatarThree from '../assets/avatar-3.jpeg';
import Chart from '../assets/chart.png';

const Reviews = () => {
  return (
    <section
      id='reviews'
      className='bg-gradient-to-t from-gray-50 via-gray-50 to-white bg-cover bg-right-bottom'
      style={{
        backgroundImage: `url(${Chart})`,
      }}
    >
      <div className='max-w-5xl space-y-16 m-auto px-4 py-16'>
        <h2 className='text-5xl lg:text-center font-bold text-blue-500 leading-none'>
          What Our Users Say
        </h2>
        <div className='flex flex-wrap justify-center gap-y-20 lg:gap-y-10 gap-x-10'>
          <ReviewCard
            avatar={AvatarOne}
            reviewer='Fahri Setiawan'
            rating={5}
            text='This app makes budgeting so much easier! The interface is clean, and the charts help me visualize my spending habits clearly.'
          />
          <ReviewCard
            avatar={AvatarTwo}
            reviewer='Rizky Pratama'
            rating={4}
            text='I used to struggle tracking my finances, but this app simplifies everything. The Google Sync feature is really useful!'
          />
          <ReviewCard
            avatar={AvatarThree}
            reviewer='Andi Wijaya'
            rating={5}
            text='Highly recommended! The transaction logs are detailed, and I feel more in control of my expenses than ever before.'
          />
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ avatar, reviewer = '', rating = 1, text = '' }) => {
  const stars = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (stars[rating - 1]?.current) {
      stars[rating - 1].current.checked = true;
    }
  }, [rating]);

  return (
    <div className='card card-compact text-center bg-white shadow-lg max-w-sm'>
      <div className='card-body text-center pt-8 gap-4'>
        <img
          src={avatar}
          alt='avatar-1'
          className='absolute -top-8 shadow-lg h-16 w-16 mask mask-circle left-1/2 -translate-x-1/2'
        />
        <div className='h-4'></div>
        <div className='grid gap-2'>
          <q className='text-lg text-gray-600'>{text}</q>
          <div className='rating rating-sm m-auto'>
            {stars.map((starRef, index) => (
              <input
                key={index}
                ref={starRef}
                type='radio'
                className='mask mask-star bg-yellow-400'
                disabled
              />
            ))}
          </div>
        </div>
        <h1 className='text-lg font-semibold'>- {reviewer} -</h1>
      </div>
    </div>
  );
};

export default Reviews;
