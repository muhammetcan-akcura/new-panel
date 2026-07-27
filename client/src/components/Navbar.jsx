'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.replace('/');
  };

  return (
    <header className="navbar">
      <div className="container flex items-center justify-between">
        <div className="brand">
          <label htmlFor="sidebar-toggle" className="hamburger-btn" title="Toggle Menu">
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
            alt="Facebook Logo"
            className="fb-logo"
          />
          <h2>fblivepanel</h2>
        </div>

        <div>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
              padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
