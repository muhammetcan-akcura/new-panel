'use client';
import React, { useState } from 'react';

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
  const charge = quantity ? ((quantity / 1000) * selectedService.rate).toFixed(4) : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:3001/api/new-order', {
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
        setMessage({ type: 'success', text: `Order placed successfully! Order ID: ${data.order}` });
        setLink('');
        setQuantity('');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4 mb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">New Order</h2>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            backgroundColor: message.type === 'error' ? 'rgba(228, 30, 63, 0.1)' : 'rgba(49, 162, 76, 0.1)',
            color: message.type === 'error' ? 'var(--danger-red)' : 'var(--success-green)',
            border: `1px solid ${message.type === 'error' ? 'var(--danger-red)' : 'var(--success-green)'}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Service */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Service
            </label>
            <select
              className="search-input"
              style={{ width: '100%', cursor: 'pointer' }}
              value={serviceId}
              onChange={(e) => {
                setServiceId(e.target.value);
                setQuantity(''); // Reset quantity when service changes to recalculate charge properly
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
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Link
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%' }}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Quantity
            </label>
            <input
              type="number"
              className="search-input"
              style={{ width: '100%' }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
              max="10000000"
            />
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Min: 1 - Max: 10 000 000
            </p>
          </div>

          {/* Charge */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Charge
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.02)', cursor: 'not-allowed' }}
              value={charge ? `$${charge}` : ''}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#ff7a50',
              color: '#fff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = '#e86a42'; }}
            onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = '#ff7a50'; }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
