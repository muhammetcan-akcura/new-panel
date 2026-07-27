'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar flex-col gap-2">
      <div className="card" style={{ padding: '1rem', position: 'sticky', top: '100px' }}>
        <h3 className="mb-4 text-sm text-secondary" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Navigation</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link 
            href="/new-order" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/new-order' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/new-order' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Order
          </Link>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
          <Link 
            href="/dashboard" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/dashboard' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/dashboard' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Live Stream Views
          </Link>
          <Link 
            href="/video-views" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/video-views' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/video-views' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Video Views
          </Link>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
          <Link 
            href="/services" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/services' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/services' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Services
          </Link>
          <Link 
            href="/add-funds" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/add-funds' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/add-funds' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Add Funds
          </Link>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
          <Link 
            href="/api" 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem',
              color: pathname === '/api' ? '#1877f2' : 'var(--text-secondary)',
              background: pathname === '/api' ? 'rgba(24, 119, 242, 0.1)' : 'transparent'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            API
          </Link>
        </nav>
      </div>
    </aside>
  );
}
