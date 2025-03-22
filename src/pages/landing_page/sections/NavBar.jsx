const NavBar = () => {
  return (
    <header className='px-4 py-2 text-gray-600 bg-white fixed w-full top-0 z-50'>
      <div className='m-auto flex justify-between items-center max-w-5xl'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-semibold text-blue-600 px-6 py-3 pl-0 rounded'>
            Budgetin
          </h1>
          <nav>
            <Ul>
              <Li to=''>Home</Li>
              <Li>Features</Li>
              <Li>Benefits</Li>
            </Ul>
          </nav>
        </div>

        <nav>
          <Ul>
            <Li>Sign in</Li>
            <li className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition-all '>
              <a href=''>Sign up</a>
            </li>
          </Ul>
        </nav>
      </div>
    </header>
  );
};

const Ul = ({ children, className = '' }) => (
  <ul className={`flex gap-4 rounded items-center ${className}`}>{children}</ul>
);
const Li = ({ children, to = '', className = '' }) => (
  <li
    className={`px-4 py-2 rounded-lg hover:text-gray-900 transition-all ${className}`}
  >
    <a href={to}>{children}</a>
  </li>
);
export default NavBar;
