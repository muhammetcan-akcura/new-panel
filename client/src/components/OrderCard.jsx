import React, { useState } from 'react';
import { cancelOrder, setPartialOrder, changeOrderStatus, editOrderLink } from '../api';

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'completed';
      case 'processing':
      case 'inprogress':
      case 'in progress':
        return 'processing';
      case 'pending':
      case 'awaiting':
        return 'pending';
      case 'canceled':
      case 'partial':
        return 'canceled';
      default: return 'pending';
    }
  };

  const getSmmStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'Sending Views...';
      case 'in progress':
      case 'inprogress': return 'Delivering...';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const isLive = (order.service_name || '').toLowerCase().includes('live');
  const delivered = Math.max(0, parseInt(order.quantity) - parseInt(order.remains));
  const progress = parseInt(order.quantity) > 0 ? Math.round((delivered / parseInt(order.quantity)) * 100) : 0;

  const handleCancel = async (e) => {
    e.stopPropagation();
    const reason = prompt("Enter cancel reason (e.g. Incorrect link):");
    if (reason) {
      setLoadingAction(true);
      await cancelOrder(order.id, reason);
      alert(`Cancel request sent for order ${order.id}`);
      setLoadingAction(false);
    }
  };

  const handleSetPartial = async (e) => {
    e.stopPropagation();
    const remains = prompt("Enter remains quantity:", order.remains);
    if (remains !== null) {
      setLoadingAction(true);
      await setPartialOrder(order.id, parseInt(remains));
      alert(`Partial set for order ${order.id}`);
      setLoadingAction(false);
    }
  };

  const handleChangeStatus = async (e) => {
    e.stopPropagation();
    const status = prompt("Enter new status (e.g. pending, inprogress, completed):");
    if (status) {
      setLoadingAction(true);
      await changeOrderStatus(order.id, status);
      alert(`Status changed to ${status} for order ${order.id}`);
      setLoadingAction(false);
    }
  };

  const handleEditLink = async (e) => {
    e.stopPropagation();
    const link = prompt("Enter new link:", order.link);
    if (link) {
      setLoadingAction(true);
      await editOrderLink(order.id, link);
      alert(`Link updated for order ${order.id}`);
      setLoadingAction(false);
    }
  };

  return (
    <div className="card order-card" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="order-id">ID: {order.id}</span>
          <span className="text-secondary text-sm ml-2">{order.service_name}</span>
        </div>
        <span className={`badge ${getStatusClass(order.status)}`}>
          {getSmmStatusText(order.status)}
        </span>
      </div>

      <div className="order-details mt-4">
        <div className="detail-row">
          <span className="label">Link:</span>
          {isLive ? (
            <a href={`/preview?url=${encodeURIComponent(order.link)}&start=${order.start_count || 0}&qty=${order.quantity || 0}`} className="value link-value live-link" style={{ color: '#4ade80', fontWeight: 'bold' }} onClick={e => e.stopPropagation()}>
              {order.link} (Live Preview 🔴)
            </a>
          ) : (
            <a href={`/video-preview?id=${order.id}&url=${encodeURIComponent(order.link)}&start=${order.start_count || 0}&qty=${order.quantity || 0}&remains=${order.remains || 0}&status=${order.status || ''}`} className="value link-value" style={{ color: '#3b82f6', fontWeight: 'bold' }} onClick={e => e.stopPropagation()}>
              {order.link} (Video Preview 📺)
            </a>
          )}
        </div>
        <div className="detail-flex mt-2">
          <div className="detail-item">
            <span className="label">Quantity:</span>
            <span className="value">{order.quantity}</span>
          </div>
          <div className="detail-item">
            <span className="label">Start Count:</span>
            <span className="value">{order.start_count}</span>
          </div>
          <div className="detail-item">
            <span className="label">Remains:</span>
            <span className="value remains">{order.remains}</span>
          </div>
        </div>
      </div>

      {/* Expandable Details Section */}
      {expanded && (
        <div className="expanded-details mt-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <h4 className="mb-2 text-sm text-secondary">DELIVERY LOGS & STATUS</h4>

          <div className="progress-bar-container mb-4" style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-green)', transition: 'width 0.5s ease' }}></div>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Delivered: <strong className="text-success">{delivered}</strong></span>
            <span>Progress: <strong>{progress}%</strong></span>
          </div>

          <div style={{ background: '#000', borderRadius: '6px', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#888', border: '1px solid var(--border-color)', overflowX: 'auto', lineHeight: '1.6' }}>
            <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#ededed' }}>[Init]</span> Preparing {isLive ? 'Live Stream Bots' : 'Video Viewers'} for Order #{order.id}</div>
            <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#ededed' }}>[Target]</span> {order.link.substring(0, 40)}...</div>
            <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#ededed' }}>[Status]</span> {order.status.toUpperCase()}</div>
            <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#0070f3' }}>[Speed]</span> ~{isLive ? Math.floor(Math.random() * 500 + 1000) : Math.floor(Math.random() * 10000 + 5000)} / hour</div>
            <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#10b981' }}>[Proxy]</span> {Math.floor(Math.random() * 20 + 40)} Nodes Active</div>
            {parseInt(order.remains) > 0 && order.status.toLowerCase() !== 'canceled' && order.status.toLowerCase() !== 'completed' && (
              <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#f5a623' }}>[Queue]</span> Injecting remaining {order.remains} views... <span className="cursor-blink">_</span></div>
            )}
            {parseInt(order.remains) === 0 && (
              <div><span style={{ color: '#666' }}>{new Date().toISOString()}</span> <span style={{ color: '#10b981' }}>[Done]</span> Delivery completed successfully.</div>
            )}
          </div>

          {/* Admin Actions */}
          {order.status.toLowerCase() !== 'canceled' && (
            <div className="mt-4" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button 
                onClick={handleCancel}
                disabled={loadingAction}
                className="action-btn action-danger"
              >
                {loadingAction ? 'Wait...' : 'Cancel Order'}
              </button>
              
              <button 
                onClick={handleSetPartial}
                disabled={loadingAction}
                className="action-btn action-warning"
              >
                {loadingAction ? 'Wait...' : 'Set Partial'}
              </button>

              <button 
                onClick={handleChangeStatus}
                disabled={loadingAction}
                className="action-btn action-default"
              >
                {loadingAction ? 'Wait...' : 'Change Status'}
              </button>

              {(order.status.toLowerCase() === 'processing' || order.status.toLowerCase() === 'in progress' || order.status.toLowerCase() === 'inprogress') && (
                <button 
                  onClick={handleEditLink}
                  disabled={loadingAction}
                  className="action-btn action-default"
                >
                  {loadingAction ? 'Wait...' : 'Edit Link'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
