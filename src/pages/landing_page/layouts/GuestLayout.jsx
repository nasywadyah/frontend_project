import { useEffect, useState } from 'react';

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
            <h4 className='text-2xl font-semibold text-blue-500 mx-2 flex-1 px-2'>
              BudgetIn
            </h4>
            <div className='hidden flex-none lg:block z-50'>
              <ul className='menu menu-horizontal gap-1'>
                {/* Navbar menu content here */}
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Features</a>
                </li>
                <li>
                  <a>Benefits</a>
                </li>
                <div className='divider divider-horizontal'></div>
                <li>
                  <a>Sign in</a>
                </li>
                <li>
                  <a className='bg-blue-500 hover:bg-blue-800 text-white'>
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-white min-h-full w-80 p-4'>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GuestLayout;
