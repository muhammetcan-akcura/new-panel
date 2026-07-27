'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  
  const startCount = parseInt(searchParams.get('start') || '0', 10);
  const qtyCount = parseInt(searchParams.get('qty') || '0', 10);
  const targetCount = startCount + qtyCount;
  
  const [logs, setLogs] = useState([]);
  const [particles, setParticles] = useState([]);
  const [viewerCount, setViewerCount] = useState(startCount);
  
  // High-tech overlay state
  const [activeNodes, setActiveNodes] = useState(84);
  const [injectRate, setInjectRate] = useState(2.4);
  
  // FB embed URL
  const fbEmbedUrl = url ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&locale=en_US` : null;

  useEffect(() => {
    if (!url) return;
    
    // Simulate connection
    setTimeout(() => {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: 'Connecting to main cluster...', type: 'info' }]);
    }, 500);

    setTimeout(() => {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `Target setup: Start from ${startCount}, Injecting ${qtyCount} viewers`, type: 'info' }]);
    }, 1000);

    setTimeout(() => {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: 'Connected to Stream: ' + url.substring(0, 40) + '...', type: 'success' }]);
    }, 1500);

    const interval = setInterval(() => {
      // Fluctuate tech stats
      setActiveNodes(Math.floor(Math.random() * 20 + 80));
      setInjectRate(parseFloat((Math.random() * 2 + 1).toFixed(1)));
      
      setViewerCount(current => {
        if (targetCount > 0 && current >= targetCount) {
          clearInterval(interval);
          setLogs(prev => [...prev.slice(-25), { time: new Date().toLocaleTimeString(), text: `[Delivery Complete] Reached target of ${targetCount} viewers.`, type: 'success' }]);
          return current;
        }
        
        const isSuccess = Math.random() > 0.15;
        let count = Math.floor(Math.random() * 15) + 1;
        
        // Prevent overshooting target
        if (targetCount > 0 && current + count > targetCount) {
          count = targetCount - current;
        }
        
        if (isSuccess && count > 0) {
          setLogs(prev => {
            const newLogs = [...prev, { 
              time: new Date().toLocaleTimeString(), 
              text: `[Node-${Math.floor(Math.random() * 999)}] Injected +${count} viewers successfully.`, 
              type: 'success' 
            }];
            return newLogs.slice(-25); // keep last 25
          });
          
          return current + count;
        } else if (!isSuccess) {
          setLogs(prev => {
            const newLogs = [...prev, { 
              time: new Date().toLocaleTimeString(), 
              text: `[Proxy-Err] Retrying connection for bots...`, 
              type: 'warning' 
            }];
            return newLogs.slice(-25);
          });
        }
        
        return current;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [url, startCount, qtyCount, targetCount]);

  if (!url) {
    return (
      <div className={styles.container}>
        <div className="card text-center mt-4" style={{ margin: 'auto', padding: '2rem' }}>
          <p className="text-secondary mb-4">No URL provided for preview.</p>
          <button className={styles.backBtn} onClick={() => router.push('/')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.liveBadge}>LIVE</span>
          Stream Preview
        </div>
        <button className={styles.backBtn} onClick={() => router.push('/')}>
          ← Back to Orders
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.videoSection}>
          {/* Admin Console Overlay */}
          <div className={styles.techOverlay}>
            <div className={styles.techPanelTopLeft}>
              <div className={styles.techLabel}>STREAM STATUS</div>
              <div className={styles.techValue} style={{ color: '#4ade80' }}>SECURE / ENCRYPTED</div>
              <div className={styles.techLabel} style={{ marginTop: '0.5rem' }}>ACTIVE NODES</div>
              <div className={styles.techValue}>{activeNodes}</div>
            </div>
            
            <div className={styles.techPanelTopRight}>
              <div className={styles.techLabel}>INJECTION RATE</div>
              <div className={styles.techValue}>~{injectRate}k / hour</div>
              <div className={styles.techLabel} style={{ marginTop: '0.5rem' }}>PROXY HEALTH</div>
              <div className={styles.techValue} style={{ color: '#4ade80' }}>100% (OPTIMAL)</div>
            </div>

            <div className={styles.techPanelBottom}>
              <div className={styles.radarLine}></div>
              <span style={{ padding: '0 1rem' }}>ANALYZING PACKETS...</span>
            </div>
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

        <div className={styles.terminalSection}>
          <div className={styles.terminalHeader}>
            <span>DELIVERY_SYSTEM_v2.1</span>
            <span>Viewers Added: <strong style={{ color: '#fff' }}>{viewerCount}</strong></span>
          </div>
          <div className={styles.terminalLogs}>
            {logs.map((log, i) => (
              <div key={i} className={`${styles.logEntry} ${styles[log.type]}`}>
                <span className={styles.timestamp}>[{log.time}]</span>
                {log.text}
              </div>
            ))}
            {/* Blinking cursor */}
            <div style={{ color: '#fff', animation: 'pulse 1s infinite' }}>_</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LivePreviewPage() {
  return (
    <Suspense fallback={<div className="container mt-4">Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
