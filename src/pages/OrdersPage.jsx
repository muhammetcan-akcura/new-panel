import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api';
import OrderCard from '../components/OrderCard';

const OrdersPage = ({ title, type }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const allOrders = await fetchOrders();
        
        // Simple filtering logic based on service_name. 
        // In a real scenario, you'd filter by exact service_id or service_type.
        const filteredOrders = allOrders.filter(order => {
          const name = (order.service_name || '').toLowerCase();
          if (type === 'live') {
            return name.includes('live');
          } else {
            return name.includes('view') && !name.includes('live');
          }
        });
        
        setOrders(filteredOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [type]);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>{title}</h2>
        <div className="card mt-4 text-center">
          <p className="text-secondary">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h2>{title}</h2>
        <div className="card mt-4" style={{ borderColor: 'var(--danger-red)' }}>
          <p style={{ color: 'var(--danger-red)' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2>{title}</h2>
        <span className="badge processing">{orders.length} Orders</span>
      </div>
      
      {orders.length === 0 ? (
        <div className="card text-center text-secondary">
          <p>No {title.toLowerCase()} found.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
