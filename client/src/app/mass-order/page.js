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

export default function MassOrderPage() {
  const [ordersText, setOrdersText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ordersText.trim()) return;

    setLoading(true);
    setResult(null);

    const lines = ordersText.split('\n').filter(line => line.trim() !== '');
    let successCount = 0;
    let errorCount = 0;
    let errorDetails = [];
    let successIds = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Format: service_id | link | quantity
      const parts = line.split('|').map(p => p.trim());
      
      if (parts.length !== 3) {
        errorCount++;
        errorDetails.push(`Line ${i + 1}: Invalid format. Please use 'service_id | link | quantity' format.`);
        continue;
      }

      const [svcId, link, qty] = parts;
      const internalId = parseInt(svcId, 10);
      const quantity = parseInt(qty, 10);

      const selectedService = SERVICES.find(s => s.id === internalId);

      if (!selectedService) {
        errorCount++;
        errorDetails.push(`Line ${i + 1}: Invalid service ID (${svcId}).`);
        continue;
      }

      if (isNaN(quantity) || quantity < 1) {
        errorCount++;
        errorDetails.push(`Line ${i + 1}: Invalid quantity (${qty}).`);
        continue;
      }

      try {
        const res = await fetch('https://new-panel-vx5g.onrender.com/api/new-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: selectedService.realId,
            link: link,
            quantity: quantity
          })
        });

        const data = await res.json();
        
        if (data.error || data.error_message) {
          errorCount++;
          errorDetails.push(`Line ${i + 1}: API Error - ${data.error || data.error_message}`);
        } else {
          successCount++;
          if (data.order) {
            successIds.push(data.order);
          }
        }
      } catch (err) {
        errorCount++;
        errorDetails.push(`Line ${i + 1}: Network Error - ${err.message}`);
      }
    }

    setResult({
      total: lines.length,
      success: successCount,
      error: errorCount,
      details: errorDetails,
      successIds: successIds
    });
    setLoading(false);
    setOrdersText('');
  };

  const copyOrderIds = () => {
    if (result && result.successIds && result.successIds.length > 0) {
      navigator.clipboard.writeText(result.successIds.join('\\n'));
      alert('Order IDs copied to clipboard!');
    }
  };

  return (
    <div className="container mt-4 mb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">Mass Order</h2>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        
        {result && (
          <div style={{
            padding: '1.5rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            backgroundColor: result.error === 0 ? 'rgba(49, 162, 76, 0.1)' : 'rgba(228, 30, 63, 0.1)',
            border: `1px solid ${result.error === 0 ? 'var(--success-green)' : 'var(--danger-red)'}`
          }}>
            <h4 style={{ color: result.error === 0 ? 'var(--success-green)' : 'var(--danger-red)', marginBottom: '0.5rem' }}>
              {result.error === 0 ? 'Orders placed successfully!' : 'An error occurred with some orders'}
            </h4>
            <div style={{ color: 'var(--text-primary)' }}>
              <strong>Total Lines:</strong> {result.total} <br/>
              <strong>Success:</strong> {result.success} <br/>
              <strong>Error:</strong> {result.error}
            </div>

            {result.successIds && result.successIds.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '4px' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Successful Order IDs:</strong>
                <textarea 
                  readOnly 
                  style={{ width: '100%', height: '80px', resize: 'vertical', fontFamily: 'monospace', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '0.5rem' }}
                  value={result.successIds.join('\\n')}
                />
                <button 
                  onClick={copyOrderIds}
                  style={{
                    background: 'var(--bg-secondary)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Copy Order IDs
                </button>
              </div>
            )}

            {result.details.length > 0 && (
              <div style={{ marginTop: '1rem', color: 'var(--danger-red)', fontSize: '0.9rem', background: '#fff', padding: '1rem', borderRadius: '4px' }}>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {result.details.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Place mass order
            </label>
            <textarea 
              className="search-input" 
              name="MassOrderForm[orders]" 
              rows="15" 
              id="links" 
              style={{ width: '100%', minHeight: '300px', resize: 'vertical', fontFamily: 'monospace' }}
              value={ordersText}
              onChange={(e) => setOrdersText(e.target.value)}
              placeholder="service_id | link | quantity&#10;service_id | link | quantity&#10;service_id | link | quantity"
              required
            ></textarea>
          </div>

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
              marginTop: '1rem',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.background = '#166fe5' }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.background = '#1877f2' }}
          >
            {loading ? 'Processing Orders...' : 'Submit Mass Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
