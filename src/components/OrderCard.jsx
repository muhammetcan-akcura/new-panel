import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'completed';
      case 'processing': 
      case 'inprogress':
        return 'processing';
      case 'pending': return 'pending';
      case 'canceled': 
      case 'partial':
        return 'canceled';
      default: return 'pending';
    }
  };

  const getSmmStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'Sending Views...';
      case 'inprogress': return 'Delivering...';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="card order-card">
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
          <a href={order.link} target="_blank" rel="noreferrer" className="value link-value">
            {order.link}
          </a>
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
        <div className="detail-row mt-2 text-sm text-secondary">
          Created: {order.created}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
