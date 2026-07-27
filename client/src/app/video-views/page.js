'use client';
import React, { useEffect, useState } from 'react';
import { fetchOrders } from '@/api';
import OrderCard from '@/components/OrderCard';

const STATUS_FILTERS = ['All', 'Awaiting', 'Pending', 'In progress', 'Processing', 'Completed', 'Partial', 'Canceled'];

export default function VideoViewsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const allOrders = await fetchOrders(page);
        
        const filteredOrders = allOrders.filter(order => {
          const name = (order.service_name || '').toLowerCase();
          return name.includes('view') && !name.includes('live');
        });
        
        setOrders(filteredOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [page]); // reload on page change

  const displayedOrders = orders.filter(order => {
    // Status filter
    let statusMatch = true;
    if (activeFilter !== 'All') {
      const s1 = (order.status || '').toLowerCase().replace('inprogress', 'in progress');
      const s2 = activeFilter.toLowerCase();
      statusMatch = s1 === s2;
    }
    
    // Search filter
    let searchMatch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      searchMatch = 
        String(order.id).includes(q) || 
        (order.link || '').toLowerCase().includes(q);
    }
    
    return statusMatch && searchMatch;
  });

  if (loading && page === 0) {
    return (
      <div className="container mt-4">
        <h2 className="dashboard-title">Video Views</h2>
        <div className="card mt-4 text-center">
          <p className="text-secondary">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h2 className="dashboard-title">Video Views</h2>
        <div className="card mt-4" style={{ borderColor: 'var(--danger-red)' }}>
          <p style={{ color: 'var(--danger-red)' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Video Views</h2>
      </div>

      <input 
        type="text" 
        className="search-input" 
        placeholder="Search by Order ID or Link..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="filter-bar">
        {STATUS_FILTERS.map(status => (
          <button 
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`filter-pill ${activeFilter === status ? 'active' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>
      
      {displayedOrders.length === 0 ? (
        <div className="card text-center text-secondary">
          <p>No orders found for this status.</p>
        </div>
      ) : (
        <div className="orders-list">
          {displayedOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination-controls">
        <button 
          className="pagination-btn" 
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0 || loading}
        >
          Previous Page
        </button>
        <span className="text-secondary">Page {page + 1}</span>
        <button 
          className="pagination-btn" 
          onClick={() => setPage(p => p + 1)}
          disabled={orders.length < 90 || loading}
        >
          {loading ? 'Loading...' : 'Next Page'}
        </button>
      </div>
    </div>
  );
}
