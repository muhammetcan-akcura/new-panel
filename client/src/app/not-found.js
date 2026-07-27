import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-4" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ fontSize: '3rem', color: 'var(--danger-red)' }}>404</h2>
      <p className="text-secondary mb-4">The page you are looking for does not exist or was moved.</p>
      <Link href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent-green)', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
        Return to Dashboard
      </Link>
    </div>
  );
}
