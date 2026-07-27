'use client';
import React, { useState, useEffect } from 'react';
import { fetchBalance } from '@/api';

export default function AddFundsPage() {
  const [amount, setAmount] = useState('50');
  const [method, setMethod] = useState('crypto');
  const [balance, setBalance] = useState('0.0000');

  useEffect(() => {
    fetchBalance().then(data => {
      if (data && data.balance) {
        setBalance(parseFloat(data.balance).toFixed(4));
      }
    });
  }, []);

  return (
    <div className="container mt-4 mb-8">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">Add Funds</h2>
        <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Top up your account balance to place new orders.</p>
      </div>

      <div className="responsive-grid" style={{ gridTemplateColumns: '1fr 350px' }}>
        {/* Main form area */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Payment Details</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              style={{ 
                width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', 
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', 
                border: '1px solid var(--border-color)', outline: 'none'
              }}
            >
              <option value="crypto">Cryptocurrency (BTC, ETH, USDT) - 5% Bonus</option>
              <option value="credit">Credit Card (Stripe)</option>
              <option value="paypal">PayPal</option>
              <option value="payeer">Payeer</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Amount ($)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>$</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                style={{ 
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2rem', borderRadius: '8px', 
                  background: 'var(--bg-secondary)', color: 'var(--text-primary)', 
                  border: '1px solid var(--border-color)', outline: 'none',
                  fontSize: '1rem'
                }} 
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Minimum amount: $10.00</p>
          </div>

          <button 
            style={{ 
              width: '100%', padding: '1rem', background: '#1877f2', color: '#fff', 
              border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', transition: 'background 0.2s'
            }}
            onClick={() => alert(`This is a visual preview! In a real scenario, this would redirect you to pay $${amount} via ${method}.`)}
            onMouseEnter={(e) => e.target.style.background = '#166fe5'}
            onMouseLeave={(e) => e.target.style.background = '#1877f2'}
          >
            Pay ${amount || '0'}
          </button>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.1) 0%, rgba(24, 119, 242, 0.02) 100%)', border: '1px solid rgba(24, 119, 242, 0.2)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Current Balance</h3>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1877f2' }}>${balance}</div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Payment Instructions</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                Funds are usually added instantly after payment completion.
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                Crypto payments require 1 network confirmation.
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                For manual payments or huge amounts, please open a ticket.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
