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

    if (username.trim() === 'admin' && password === '123456') {
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
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem', lineHeight: 1 }}>📊</div>
          <h1>StreamPanel</h1>
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
