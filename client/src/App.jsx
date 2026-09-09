import React from 'react';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    // Temporary sandbox wrapper to mimic the real app's spacing
    <div style={{ 
      backgroundColor: 'var(--bb-bg)', 
      minHeight: '100vh', 
      padding: '40px 24px',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* A placeholder so you know where the TopNav will eventually go */}
        <div style={{ marginBottom: '30px', color: 'var(--bb-text-muted)', fontWeight: 600 }}>
          [Teammates' Navigation Will Appear Here After Merge]
        </div>

        {/* Your isolated module */}
        <Analytics />
        
      </div>
    </div>
  );
}