import { useEffect, useRef } from 'react';
import AvatarOne from '../assets/avatar-1.jpeg';
import AvatarTwo from '../assets/avatar-2.jpeg';
import AvatarThree from '../assets/avatar-3.jpeg';
import Chart from '../assets/chart.png'

const Reviews = () => {
  return (
    <section className='bg-gradient-to-t from-gray-50 via-gray-50 to-white relative'>
      <img src={Chart} alt="" className='absolute  bottom-0 right-0' />
      <div className='max-w-5xl flex flex-wrap gap-y-20 gap-x-10 m-auto px-4 py-36'>
        <ReviewCard
          avatar={AvatarOne}
          reviewer='Banyu'
          rating={5}
          text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, dolores?'
        />
        <ReviewCard
          avatar={AvatarTwo}
          reviewer='Banyu'
          rating={4}
          text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, dolores?'
        />
        <ReviewCard
          avatar={AvatarThree}
          reviewer='Banyu'
          rating={4}
          text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, dolores?'
        />
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
    <div className='card card-compact text-center bg-white shadow-lg max-w-sm m-auto'>
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
