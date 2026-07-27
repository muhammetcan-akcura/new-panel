'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/';

  const [mounted, setMounted] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    const authStatus = true; // BYPASS: localStorage.getItem('isAuthenticated') === 'true';
    setIsAuth(authStatus);

    if (!authStatus && !isLoginPage) {
      router.replace('/');
    } else if (authStatus && isLoginPage) {
      router.replace('/dashboard');
    }
  }, [pathname, isLoginPage, router]);

  // We wrap everything in a div that is hidden until mounted.
  // This prevents hydration mismatches (since DOM is fully rendered) 
  // but prevents the user from seeing any content until auth is checked.
  const wrapperStyle = {
    visibility: mounted ? 'visible' : 'hidden',
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.2s ease',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  };

  // If redirecting, we can keep it hidden
  if (mounted && !isAuth && !isLoginPage) {
    wrapperStyle.visibility = 'hidden';
  }
  if (mounted && isAuth && isLoginPage) {
    wrapperStyle.visibility = 'hidden';
  }

  if (isLoginPage) {
    return <div style={wrapperStyle}>{children}</div>;
  }

  return (
    <div style={wrapperStyle}>
      <input type="checkbox" id="sidebar-toggle" className="sidebar-toggle-checkbox" />
      <div className="app-container">
        <Navbar />
        <Sidebar />

        <label htmlFor="sidebar-toggle" className="sidebar-overlay"></label>

        <main className="main-content">
          <div className="container mt-4">
            {children}
          </div>
        </main>

        {/* Floating Telegram Button */}
        <a href="https://t.me/fblivepanel" target="_blank" rel="noreferrer" className="telegram-float-btn" aria-label="Contact us on Telegram">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L2 9.5L9.5 12.5L14 9L11.5 14L19 22L22 2Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </div>
  );
}
