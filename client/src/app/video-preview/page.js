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

  // FB embed URL
  const fbEmbedUrl = url ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560` : null;

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
        <div className={styles.videoSection}>
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

        <div className={styles.analyticsSection}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>Order Details</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
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
