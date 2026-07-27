'use client';
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-4 mb-8" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>
        <svg viewBox="0 0 24 24" width="100" height="100" fill="#1877f2" style={{ filter: 'drop-shadow(0 10px 15px rgba(24, 119, 242, 0.3))' }}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
      
      <h2 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', lineHeight: 1 }}>404</h2>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Page Not Found</h3>
      
      <p className="text-secondary mb-4" style={{ maxWidth: '450px', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link href="/orders" style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.85rem 2rem', 
        backgroundColor: '#1877f2', 
        color: '#fff', 
        borderRadius: '8px', 
        textDecoration: 'none', 
        fontWeight: 600,
        fontSize: '1.05rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#166fe5';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#1877f2';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Return to Dashboard
      </Link>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
