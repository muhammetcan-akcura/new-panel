'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { fetchBalance } from '../../api';

const SERVICES = [
  { id: 1, realId: 7238, category: 'Video/Reel Views', name: 'video/Reel views', rate: 0.02 },
  { id: 2, realId: 7239, category: 'Video/Reel Views', name: 'video/Reel views', rate: 0.06 },
  { id: 3, realId: 7223, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (15 Miutes)', rate: 0.30 },
  { id: 4, realId: 7224, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (30 Miutes)', rate: 0.60 },
  { id: 5, realId: 7225, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (60 Miutes)', rate: 1.20 },
  { id: 6, realId: 7226, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (90 Miutes)', rate: 1.80 },
  { id: 7, realId: 7227, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (120 Miutes)', rate: 2.20 },
  { id: 8, realId: 7228, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (150 Miutes)', rate: 2.80 },
  { id: 9, realId: 7229, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (180 Miutes)', rate: 3.20 },
  { id: 10, realId: 7230, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (210 Miutes)', rate: 3.80 },
  { id: 11, realId: 7231, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (240 Miutes)', rate: 4.20 },
  { id: 12, realId: 7232, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (270 Miutes)', rate: 4.80 },
  { id: 13, realId: 7233, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (300 Miutes)', rate: 5.20 },
  { id: 14, realId: 7234, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (330 Miutes)', rate: 5.80 },
  { id: 15, realId: 7235, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (360 Miutes)', rate: 6.20 },
  { id: 16, realId: 7236, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (390 Miutes)', rate: 6.80 },
  { id: 17, realId: 7237, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (420 Miutes)', rate: 7.40 }
];

export default function NewOrderPage() {
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const selectedService = SERVICES.find(s => s.id == serviceId);
  const charge = quantity ? ((quantity / 1000) * selectedService.rate).toFixed(4) : '0.0000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('https://new-panel-vx5g.onrender.com/api/new-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService.realId,
          link,
          quantity
        })
      });

      const data = await res.json();

      if (data.error || data.error_message) {
        setMessage({ type: 'error', text: data.error || data.error_message || 'An error occurred' });
      } else {
        const balData = await fetchBalance();
        const currentBalance = balData && balData.balance !== undefined ? parseFloat(balData.balance).toFixed(4) : '0.0000';
        
        setMessage({ 
          type: 'success', 
          details: {
            id: data.order,
            service: selectedService.name,
            link: link,
            quantity: quantity,
            charge: charge,
            balance: currentBalance
          }
        });
        setLink('');
        setQuantity('');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4 mb-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="dashboard-title">Place New Order</h2>
      </div>

      {message && message.type === 'error' && (
        <div style={{
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(228, 30, 63, 0.1)',
          color: 'var(--danger-red)',
          border: '1px solid var(--danger-red)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 500
        }}>
          ⚠️ {message.text}
        </div>
      )}

      {message && message.type === 'success' && message.details && (
        <div style={{
          padding: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          backgroundColor: '#e6f8ec', /* Light green matching the screenshot */
          color: '#155724',
          border: '1px solid #c3e6cb',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          fontSize: '0.95rem'
        }}>
          <h4 style={{ color: '#0f5132', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your order received</h4>
          <div><span style={{ color: '#28a745' }}>ID:</span> <Link href={`/orders?search=${message.details.id}`} style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#0f5132' }}>{message.details.id}</Link></div>
          <div><span style={{ color: '#28a745' }}>Service:</span> 🔷 {message.details.service}</div>
          <div><span style={{ color: '#28a745' }}>Link:</span> <span style={{ color: '#155724' }}>{message.details.link}</span></div>
          <div><span style={{ color: '#28a745' }}>Quantity:</span> <span style={{ color: '#155724' }}>{message.details.quantity}</span></div>
          <div><span style={{ color: '#28a745' }}>Charge:</span> <span style={{ color: '#155724' }}>${message.details.charge}</span></div>
          <div><span style={{ color: '#28a745' }}>Balance:</span> <span style={{ color: '#155724' }}>${message.details.balance}</span></div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Form Section */}
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Service */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Category & Service
              </label>
              <select
                className="search-input"
                style={{ width: '100%', cursor: 'pointer', padding: '0.75rem', borderRadius: '6px' }}
                value={serviceId}
                onChange={(e) => {
                  setServiceId(e.target.value);
                  setQuantity('');
                }}
                required
              >
                <optgroup label="Video/Reel Views">
                  {SERVICES.filter(s => s.category === 'Video/Reel Views').map(s => (
                    <option key={s.id} value={s.id}>{s.id} - {s.name} - ${s.rate} per 1000</option>
                  ))}
                </optgroup>
                <optgroup label="Live Stream Views">
                  {SERVICES.filter(s => s.category === 'Live Stream Views').map(s => (
                    <option key={s.id} value={s.id}>{s.id} - {s.name} - ${s.rate} per 1000</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Link */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Link
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px' }}
                placeholder="https://facebook.com/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Quantity
              </label>
              <input
                type="number"
                className="search-input"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px' }}
                placeholder="Minimum 1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
                max="10000000"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#1877f2',
                color: '#fff',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 10px rgba(24, 119, 242, 0.2)'
              }}
              onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = '#166fe5'; }}
              onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = '#1877f2'; }}
            >
              {loading ? 'Processing...' : 'Submit Order'}
            </button>
          </form>
        </div>

        {/* Info/Stats Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: 600 }}>
              Order Summary
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Service:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>{selectedService.name}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Rate per 1000:</span>
                <span style={{ color: '#4ade80', fontWeight: 600 }}>${selectedService.rate}</span>
              </div>
              
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Charge:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ${charge}
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', background: 'rgba(24, 119, 242, 0.05)', border: '1px solid rgba(24, 119, 242, 0.2)' }}>
            <h4 style={{ color: '#1877f2', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ℹ️ Service Information
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Please make sure your Facebook video or live stream is public. Do not order the same link twice at the same time. The delivery will start automatically within a few minutes after placing the order.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
