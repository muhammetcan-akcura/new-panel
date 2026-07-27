'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { fetchBalance } from '../api';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [balance, setBalance] = useState('0.0000');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      const data = await fetchBalance();
      if (data && data.balance !== undefined) {
        setBalance(parseFloat(data.balance).toFixed(4));
      }
    };
    getBalance();
    // Optional: Refresh balance every 60 seconds
    const interval = setInterval(getBalance, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.replace('/');
  };

  const navLinks = [
    { name: 'New order', path: '/new-order' },
    { name: 'Services', path: '/services' },
    { name: 'Orders', path: '/orders' },
    { name: 'Add funds', path: '/add-funds' },
    { name: 'API', path: '/api' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Mass order', path: '/mass-order' },
  ];

  return (
    <header style={{ backgroundColor: '#1877f2', color: '#ffffff', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '64px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Sol Taraf: Logo ve Linkler */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/orders" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none', marginRight: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg> 
            fblivePanel
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '0.25rem' }}>
            {navLinks.map(link => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sağ Taraf: Bakiye, Hesap ve Çıkış (Desktop) */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.25)', 
            padding: '0.3rem 0.8rem', 
            borderRadius: '20px', 
            fontSize: '0.9rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            ${balance}
          </div>
          
          <Link href="/account" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>
            Account
          </Link>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent', border: 'none', color: '#fff',
              cursor: 'pointer', fontWeight: 500, padding: 0, fontSize: '0.95rem'
            }}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <div style={{ padding: '0.5rem 1rem', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
            Balance: ${balance}
          </div>
          
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ backgroundColor: pathname === link.path ? 'rgba(255,255,255,0.2)' : 'transparent' }}
            >
              {link.name}
            </Link>
          ))}
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>
          
          <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
            Account
          </Link>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            style={{
              background: 'transparent', border: 'none', color: '#fff', textAlign: 'left',
              cursor: 'pointer', fontWeight: 500, padding: '0.75rem 1rem', fontSize: '1rem'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
