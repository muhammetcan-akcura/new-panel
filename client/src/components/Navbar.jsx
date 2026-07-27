'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

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
    <header style={{ backgroundColor: '#1877f2', color: '#ffffff', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '64px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Sol Taraf: Logo ve Linkler */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/orders" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none', marginRight: '2.5rem' }}>
            fblivepanel
          </Link>
          
          <nav style={{ display: 'flex', gap: '0.25rem' }}>
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

        {/* Sağ Taraf: Bakiye, Hesap ve Çıkış */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
            $0.0000
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

      </div>
    </header>
  );
};

export default Navbar;
