'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true') {
      router.replace('/orders');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter your username and password.');
      return;
    }

    const envUsers = process.env.NEXT_PUBLIC_USERS || 'admin:Panel!2026Admin,dichvumat:dichvumat2026';
    const usersList = envUsers.split(',').map(u => u.split(':'));
    
    const isValidUser = usersList.some(([u, p]) => u === username.trim() && p === password);

    if (isValidUser) {
      setError('');
      setIsLoggingIn(true);

      setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/orders');
      }, 1000);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <svg viewBox="0 0 24 24" width="56" height="56" fill="#1877f2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <h1>fblivePanel</h1>
          <p className="login-subtitle">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={`login-button ${isLoggingIn ? 'loading' : ''}`} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <span className="loader">Logging in...</span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Welcome to Stream Provider Panel</p>
        </div>
      </div>
    </div>
  );
}
