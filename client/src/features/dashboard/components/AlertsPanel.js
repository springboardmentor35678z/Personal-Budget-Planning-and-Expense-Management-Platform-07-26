import React from 'react';
import './AlertsPanel.css';

function AlertsPanel({ alerts = [] }) {
  return (
    <div className="alerts-panel-card">
      <div className="alerts-header">
        <h3 className="section-title">Alerts</h3>
        <span className="alerts-badge">{alerts.length} new</span>
      </div>

      <div className="alerts-list">
        {alerts.map((a) => (
          <div key={a.id} className="alert-item">
            <span className={`alert-dot dot-${a.dot_color || 'blue'}`}></span>
            <div className="alert-content">
              <div className="alert-title">{a.title}</div>
              <div className="alert-desc">{a.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsPanel;
