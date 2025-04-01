import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo-blue.png';

const GuestLayout = ({ children }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setScroll(true) : setScroll(false)
    );
  }, []);

  return (
    <div className='drawer'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div
          className={`fixed top-0 w-full ${
            scroll && 'bg-white'
          } z-50 transition-all`}
        >
          <div className='navbar w-full max-w-5xl m-auto'>
            <div className='flex-none lg:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='text-2xl font-semibold space-x-2 text-blue-500 mx-2 flex-1 px-2'>
              <img src={logo} className='h-8' />
              <h4>BudgetIn</h4>
            </div>
            <div className='hidden flex-none lg:block z-50'>
              <ul className='menu menu-horizontal gap-1'>
                {/* Navbar menu content here */}
                <li>
                  <a href='#home'>Home</a>
                </li>
                <li>
                  <a href='#benefits'>Benefits</a>
                </li>
                <li>
                  <a href='#features'>Features</a>
                </li>
                <li>
                  <a href='#reviews'>Reviews</a>
                </li>
                <div className='divider divider-horizontal'></div>
                <li>
                  <Link to={'/sign-in'}>Sign in</Link>
                </li>
                <li>
                  <Link
                    to={'/sign-up'}
                    className='bg-blue-500 hover:bg-blue-800 text-white'
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className='drawer-side z-50'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-white min-h-full justify-between w-80 p-4'>
          {/* Sidebar content here */}

          <div>
            <li>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </li>
            <li>
              <a href='#home'>Home</a>
            </li>
            <li>
              <a href='#benefits'>Benefits</a>
            </li>
            <li>
              <a href='#features'>Features</a>
            </li>
            <li>
              <a href='#reviews'>Reviews</a>
            </li>
          </div>
          <div>
            <div className='divider'></div>
            <li>
              <Link to={'/sign-in'}>Sign in</Link>
            </li>
            <li>
              <Link
                to={'/sign-up'}
                className='bg-blue-500 hover:bg-blue-800 text-white'
              >
                Sign up
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default GuestLayout;
