const Footer = () => {
  return (
    <section className='bg-blue-900 text-white'>
      <footer className='footer max-w-5xl p-10 px-4 m-auto'>
        <aside>
          <h1 className='text-5xl font-bold'>BudgetIn</h1>
          <p>
            Powerful. Simple.
            <br />
            Track your incomes and expenses.
          </p>
        </aside>
        <nav>
          <h6 className='footer-title'>Get Started</h6>
          <a className='link link-hover'>Sign in</a>
          <a className='link link-hover'>Sign up</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Sections</h6>
          <a className='link link-hover'>Home</a>
          <a className='link link-hover'>Features</a>
          <a className='link link-hover'>Benefits</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Developers</h6>
          <a className='link link-hover'>Muhammad Daffa Ibnu Fawwazy</a>
          <a className='link link-hover'>Arfa Banyu Santoro</a>
          <a className='link link-hover'>Chaesya Alya Destriandy</a>
          <a className='link link-hover'>Nasywa Dyah Putri</a>
          <a className='link link-hover'>Muhammad Raihan Al Farizy</a>
          <a className='link link-hover'>Edward Nicholas Wijaya</a>
        </nav>
      </footer>
      <footer className='footer footer-center bg-blue-900 text-white p-4'>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            CC25-SF035
          </p>
        </aside>
      </footer>
    </section>
  );
};

const Ul = ({ children, className = '' }) => (
  <ul className={`space-y-2 ${className}`}>{children}</ul>
);
const Title = ({ children, className = '' }) => (
  <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>
);
const Li = ({ children, to = '', className = '' }) => (
  <li
    className={`w-52 rounded-lg text-gray-200 hover:text-gray-400 transition-all ${className}`}
  >
    <a href={to}>{children}</a>
  </li>
);

export default Footer;
