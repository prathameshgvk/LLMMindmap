import React, { useState, useEffect } from 'react';
import './App.css';

function MindmapPage() {
  const [mindmapData, setMindmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This component would be used when opening mindmaps in a dedicated tab
    // For now, it's a placeholder since the main functionality is in the widget
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
          <div>Loading Mindmap...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{
        background: '#f8f9fa',
        padding: '16px 24px',
        borderBottom: '1px solid #e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          🧠 ChatGPT Mindmap Viewer
        </h1>
      </header>
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🧠</div>
          <h2 style={{ marginBottom: '16px', color: '#374151' }}>
            Mindmap Viewer
          </h2>
          <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
            This page is designed to display interactive mindmaps generated from your ChatGPT conversations. 
            Currently, all mindmap functionality is available through the widget on ChatGPT pages.
          </p>
          <div style={{ 
            background: '#f3f4f6', 
            padding: '16px', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#374151'
          }}>
            <strong>How to use:</strong>
            <br />
            1. Go to <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: '#10a37f' }}>chatgpt.com</a>
            <br />
            2. Look for the 🧠 widget on the page
            <br />
            3. Click the widget to generate a mindmap
            <br />
            4. Double-click the widget to select from recent chats
          </div>
        </div>
      </main>
    </div>
  );
}

export default MindmapPage; 