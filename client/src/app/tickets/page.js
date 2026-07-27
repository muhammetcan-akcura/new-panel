'use client';
import React, { useState } from 'react';

export default function TicketsPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('You do not have permission to use the ticketing system.');
  };

  return (
    <div className="container mt-4 mb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">Tickets</h2>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {error && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(228, 30, 63, 0.1)',
            color: 'var(--danger-red)',
            border: '1px solid var(--danger-red)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Subject
            </label>
            <input 
              type="text" 
              className="search-input" 
              style={{ width: '100%' }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Message
            </label>
            <textarea 
              className="search-input" 
              style={{ width: '100%', minHeight: '150px', resize: 'vertical' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            style={{
              background: '#1877f2',
              color: '#fff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#166fe5'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1877f2'}
          >
            Submit Ticket
          </button>
        </form>
      </div>

      <div className="card mt-4" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--text-primary)' }}>Previous Tickets</h3>
        <p className="text-secondary" style={{ textAlign: 'center', marginTop: '1rem' }}>
          No tickets found.
        </p>
      </div>
    </div>
  );
}
