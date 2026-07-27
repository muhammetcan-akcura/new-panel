'use client';
import React, { useEffect, useState } from 'react';
import { fetchBalance } from '../../api';

export default function AccountPage() {
  const [balance, setBalance] = useState('0.0000');
  const [loading, setLoading] = useState(true);

  // Sahte kullanıcı bilgileri
  const user = {
    username: 'admin',
    email: 'admin@fblivepanel.com',
    status: 'Active',
    registered: 'Jan 15, 2026'
  };

  useEffect(() => {
    const getBalance = async () => {
      const data = await fetchBalance();
      if (data && data.balance !== undefined) {
        setBalance(parseFloat(data.balance).toFixed(4));
      }
      setLoading(false);
    };
    getBalance();
  }, []);

  return (
    <div className="container mt-4 mb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">Account Settings</h2>
      </div>

      <div className="responsive-grid responsive-grid-2col">
        
        {/* Sol Taraf: Profil Kartı */}
        <div className="card" style={{ padding: '2rem', textAlign: 'center', height: 'fit-content' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #1877f2, #166fe5)',
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: '0 auto 1rem auto',
            boxShadow: '0 4px 10px rgba(24, 119, 242, 0.3)'
          }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            @{user.username}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {user.email}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status:</span>
              <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>{user.status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Member since:</span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{user.registered}</span>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Bakiye ve API Bilgileri */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: 600 }}>
              Current Balance
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {loading ? (
                  <span style={{ color: 'var(--text-secondary)' }}>Loading...</span>
                ) : (
                  `$${balance}`
                )}
              </div>
            </div>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your balance is automatically synced with the provider network.
            </p>
            <button 
              style={{
                marginTop: '1.5rem',
                background: '#1877f2',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#166fe5'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1877f2'}
              onClick={() => window.location.href = '/add-funds'}
            >
              Add Funds
            </button>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: 600 }}>
              Account Security
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Email Address
                </label>
                <input 
                  type="text" 
                  className="search-input" 
                  value={user.email} 
                  disabled 
                  style={{ width: '100%', background: 'var(--bg-primary)', cursor: 'not-allowed', color: 'var(--text-secondary)' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  className="search-input" 
                  value="********" 
                  disabled 
                  style={{ width: '100%', background: 'var(--bg-primary)', cursor: 'not-allowed', color: 'var(--text-secondary)' }} 
                />
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#e41e3f', cursor: 'pointer', fontWeight: 500 }}>
                  Reset Password (Contact Support)
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: 600 }}>
              API Access
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Your API Key
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="search-input" 
                    value="sk_live_fb_8x9a2b3c4d5e6f7g8h" 
                    readOnly 
                    style={{ flex: 1, background: 'var(--bg-primary)', color: 'var(--text-primary)' }} 
                  />
                  <button 
                    style={{
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '0 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    onClick={() => alert("Kopyalandı!")}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button 
                style={{
                  background: 'rgba(228, 30, 63, 0.1)',
                  color: 'var(--danger-red)',
                  border: '1px solid rgba(228, 30, 63, 0.2)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'inline-block',
                  marginTop: '0.5rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(228, 30, 63, 0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(228, 30, 63, 0.1)'}
                onClick={() => alert("Yetkiniz Yok! Yeni bir API anahtarı (Generate New API Key) oluşturmak için yönetici izinlerine sahip olmanız gerekmektedir.")}
              >
                Generate New API Key
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
