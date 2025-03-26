import { Link } from 'react-router-dom';

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
          <Link to={'/sign-in'} className='link link-hover'>
            Sign in
          </Link>
          <Link to={'/sign-up'} className='link link-hover'>
            Sign up
          </Link>
        </nav>
        <nav>
          <h6 className='footer-title'>Sections</h6>
          <a href='#home' className='link link-hover'>
            Home
          </a>
          <a href='#benefits' className='link link-hover'>
            Benefits
          </a>
          <a href='#features' className='link link-hover'>
            Features
          </a>
          <a href='#reviews' className='link link-hover'>
            Reviews
          </a>
        </nav>
        <nav>
          <h6 className='footer-title'>Developers</h6>
          <a href='/' className='link link-hover'>
            Muhammad Daffa Ibnu Fawwazy
          </a>
          <a href='/' className='link link-hover'>
            Arfa Banyu Santoro
          </a>
          <a href='/' className='link link-hover'>
            Chaesya Alya Destriandy
          </a>
          <a href='/' className='link link-hover'>
            Nasywa Dyah Putri
          </a>
          <a href='/' className='link link-hover'>
            Muhammad Raihan Al Farizy
          </a>
          <a href='/' className='link link-hover'>
            Edward Nicholas Wijaya
          </a>
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

export default Footer;
