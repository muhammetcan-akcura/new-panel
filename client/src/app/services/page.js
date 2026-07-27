'use client';
import React from 'react';
import { SERVICES } from '@/api';

export default function ServicesPage() {
  // Group services by category
  const categories = SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="container mt-4 mb-8">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">Our Services & Pricing</h2>
        <p className="text-secondary" style={{ marginTop: '0.5rem' }}>View all available Facebook services and their rates per 1,000 quantity.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(categories).map(([category, services]) => (
          <div key={category} className="card">
            <h3 style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', margin: '-1.5rem -1.5rem 1rem -1.5rem', fontWeight: 600, color: 'var(--text-primary)', background: 'rgba(255,255,255,0.02)' }}>
              {category}
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>ID</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Service Name</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Rate / 1000</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{service.id}</td>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{service.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '0.3rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                          ${service.rate.toFixed(2)}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.9rem' }}>
                          <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></span> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
