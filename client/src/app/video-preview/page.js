'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cancelOrder, setPartialOrder } from '../../api';
import styles from './video.module.css';

function VideoPreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = searchParams.get('id');
  const url = searchParams.get('url');
  const status = searchParams.get('status') || 'Unknown';
  const startCount = searchParams.get('start') || '0';
  const qtyCount = searchParams.get('qty') || '0';
  const remains = searchParams.get('remains') || '0';
  
  const [loadingAction, setLoadingAction] = useState(false);

  // FB embed URL - locale=en_US ile İngilizceye zorluyoruz
  const fbEmbedUrl = url ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&locale=en_US` : null;

  const handleCancel = async () => {
    const reason = prompt("Enter cancel reason (e.g. Incorrect link):");
    if (reason && id) {
      setLoadingAction(true);
      try {
        await cancelOrder(id, reason);
        alert(`Cancel request sent for order ${id}`);
      } catch(e) {
        alert('Failed to cancel order.');
      }
      setLoadingAction(false);
    }
  };

  const handleSetPartial = async () => {
    const remainsQty = prompt("Enter remains quantity:", remains);
    if (remainsQty !== null && id) {
      setLoadingAction(true);
      try {
        await setPartialOrder(id, parseInt(remainsQty));
        alert(`Partial set for order ${id}`);
      } catch(e) {
        alert('Failed to set partial.');
      }
      setLoadingAction(false);
    }
  };

  if (!url) {
    return (
      <div className={styles.container}>
        <div className="card text-center mt-4" style={{ margin: 'auto', padding: '2rem', maxWidth: '600px' }}>
          <p className="text-secondary mb-4">No URL provided for preview.</p>
          <button className={styles.backBtn} onClick={() => router.push('/orders')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.videoBadge}>VIDEO</span>
          Order #{id} Preview
        </div>
        <button className={styles.backBtn} onClick={() => router.push('/orders')}>
          ← Back to Orders
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.videoSection} style={{ flexDirection: 'column' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={styles.placeholderContent}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '1px' }}>MEDIA UNAVAILABLE OR LOADING</span>
            </div>
            <iframe 
              src={fbEmbedUrl} 
              className={styles.videoFrame}
              style={{ border: 'none', overflow: 'hidden' }} 
              scrolling="no" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer" 
            style={{
              display: 'block',
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              color: '#3b82f6',
              textAlign: 'center',
              padding: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.2s',
              zIndex: 3
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            ↗ Open Video in Facebook
          </a>
        </div>

        <div className={styles.analyticsSection}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>Order Details</div>
            
            <div className={`responsive-grid responsive-grid-half ${styles.statsGrid}`} style={{ marginTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{status}</div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quantity</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{qtyCount}</div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Start Count</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{startCount}</div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Remains</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{remains}</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleCancel}
                disabled={loadingAction || status.toLowerCase() === 'canceled'}
                style={{
                  background: 'rgba(228, 30, 63, 0.1)',
                  color: 'var(--danger-red)',
                  border: '1px solid var(--danger-red)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  cursor: loadingAction || status.toLowerCase() === 'canceled' ? 'not-allowed' : 'pointer',
                  flex: 1
                }}
              >
                {loadingAction ? 'Wait...' : 'Cancel Order'}
              </button>

              <button 
                onClick={handleSetPartial}
                disabled={loadingAction || status.toLowerCase() === 'canceled' || status.toLowerCase() === 'completed'}
                style={{
                  background: 'rgba(245, 166, 35, 0.1)',
                  color: '#f5a623',
                  border: '1px solid #f5a623',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  cursor: loadingAction || status.toLowerCase() === 'canceled' || status.toLowerCase() === 'completed' ? 'not-allowed' : 'pointer',
                  flex: 1
                }}
              >
                {loadingAction ? 'Wait...' : 'Set Partial'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoPreviewPage() {
  return (
    <Suspense fallback={<div className="container mt-4">Loading preview...</div>}>
      <VideoPreviewContent />
    </Suspense>
  );
}
