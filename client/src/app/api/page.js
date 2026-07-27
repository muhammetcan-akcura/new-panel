'use client';
import React, { useState } from 'react';

export default function ApiPage() {
  const [addOrderType, setAddOrderType] = useState('0');

  return (
    <div className="container mt-4 mb-8">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">API Documentation</h2>
        <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Automate your fblivepanel workflows</p>
      </div>

      {/* Top Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card text-center" style={{ padding: '1.5rem' }}>
          <h3 className="text-secondary text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>HTTP Method</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--info-blue)' }}>POST</p>
        </div>
        <div className="card text-center" style={{ padding: '1.5rem' }}>
          <h3 className="text-secondary text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>API URL</h3>
          <p style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem' }}>https://fblivepanel.com.com/api/v2</p>
        </div>
        <div className="card text-center" style={{ padding: '1.5rem' }}>
          <h3 className="text-secondary text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>API Key</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Get an API key on the Account page</p>
        </div>
        <div className="card text-center" style={{ padding: '1.5rem' }}>
          <h3 className="text-secondary text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Response Format</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--info-blue)' }}>JSON</p>
        </div>
      </div>

      <style jsx>{`
        .api-section { margin-bottom: 2rem; }
        .api-section-title { font-size: 1.1rem; font-weight: 600; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.02); margin: 0; }
        .api-section-body { padding: 1.5rem; display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; }
        @media (max-width: 900px) { .api-section-body { grid-template-columns: 1fr; } }
        .api-table { width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; }
        .api-table th { text-align: left; padding: 0.75rem 1rem; background: rgba(0,0,0,0.03); font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid var(--border-color); }
        .api-table td { padding: 0.75rem 1rem; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); }
        .api-table tr:last-child td { border-bottom: none; }
        .api-code-block { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; margin-top: 1rem; }
        .param-name { font-family: monospace; font-weight: 600; color: var(--text-primary); }
      `}</style>

      {/* Service List */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Service list</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>services</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`[
  {
    "service": 1,
    "name": "Followers",
    "type": "Default",
    "category": "First Category",
    "rate": "0.90",
    "min": "50",
    "max": "10000",
    "refill": true,
    "cancel": true
  }
]`}
            </pre>
          </div>
        </div>
      </div>

      {/* Add Order */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Add order</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>Parameters</h4>
            <select 
              className="search-input" 
              value={addOrderType} 
              onChange={(e) => setAddOrderType(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem', cursor: 'pointer' }}
            >
              <option value="0">Default</option>
              <option value="10">Package</option>
              <option value="1">SEO</option>
              <option value="2">Custom Comments</option>
              <option value="15">Comment Likes</option>
              <option value="17">Poll</option>
              <option value="100">Subscriptions</option>
            </select>

            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>add</td></tr>
                <tr><td className="param-name">service</td><td>Service ID</td></tr>
                <tr><td className="param-name">link</td><td>Link to page</td></tr>
                
                {['0','1','15','17'].includes(addOrderType) && <tr><td className="param-name">quantity</td><td>Needed quantity</td></tr>}
                
                {addOrderType === '0' && (
                  <>
                    <tr><td className="param-name">runs (optional)</td><td>Runs to deliver</td></tr>
                    <tr><td className="param-name">interval (optional)</td><td>Interval in minutes</td></tr>
                  </>
                )}
                
                {addOrderType === '1' && <tr><td className="param-name">keywords</td><td>Keywords list separated by \\r\\n or \\n</td></tr>}
                
                {addOrderType === '2' && <tr><td className="param-name">comments</td><td>Comments list separated by \\r\\n or \\n</td></tr>}
                
                {addOrderType === '15' && <tr><td className="param-name">username</td><td>Username of the comment owner</td></tr>}
                
                {addOrderType === '17' && <tr><td className="param-name">answer_number</td><td>Answer number of the poll</td></tr>}

                {addOrderType === '100' && (
                  <>
                    <tr><td className="param-name">username</td><td>Username</td></tr>
                    <tr><td className="param-name">min</td><td>Quantity min</td></tr>
                    <tr><td className="param-name">max</td><td>Quantity max</td></tr>
                    <tr><td className="param-name">posts (optional)</td><td>Use this parameter if you want to limit the number of new posts...</td></tr>
                    <tr><td className="param-name">delay</td><td>Delay in minutes. Possible values: 0, 5, 10, 15, 30, 60...</td></tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "order": 23501
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Order status</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>status</td></tr>
                <tr><td className="param-name">order</td><td>Order ID</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "charge": "0.27819",
  "start_count": "3572",
  "status": "Partial",
  "remains": "157",
  "currency": "USD"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Multiple Orders Status */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Multiple orders status</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>status</td></tr>
                <tr><td className="param-name">orders</td><td>Order IDs separated by comma (up to 100)</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "1": {
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
  },
  "10": {
    "error": "Incorrect order ID"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Create Refill */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Create refill</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>refill</td></tr>
                <tr><td className="param-name">order</td><td>Order ID</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "refill": "1"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Refill Status */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">Refill status</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>refill_status</td></tr>
                <tr><td className="param-name">refill</td><td>Refill ID</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "status": "Completed"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* User Balance */}
      <div className="card api-section" style={{ padding: 0 }}>
        <h3 className="api-section-title">User balance</h3>
        <div className="api-section-body">
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Parameters</h4>
            <table className="api-table">
              <thead><tr><th>Parameter</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className="param-name">key</td><td>Your API key</td></tr>
                <tr><td className="param-name">action</td><td>balance</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Example Response</h4>
            <pre className="api-code-block">
{`{
  "balance": "100.84292",
  "currency": "USD"
}`}
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
}
