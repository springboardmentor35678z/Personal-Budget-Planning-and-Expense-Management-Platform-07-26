import React from 'react';
import './UpcomingBills.css';

function UpcomingBills({ bills = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'house':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'zap':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 'music':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case 'phone':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div className="upcoming-bills-card">
      <div className="bills-header">
        <h3 className="section-title">Upcoming Bills</h3>
        <span className="bills-count-badge">{bills.length} due</span>
      </div>

      <div className="bills-list">
        {bills.map((b) => (
          <div key={b.id} className="bill-item">
            <div className="bill-left">
              <div className={`bill-icon-wrap ${b.status.toLowerCase()}`}>
                {getIcon(b.icon_type)}
              </div>
              <div className="bill-details">
                <div className="bill-title-status">
                  <span className="bill-title">{b.title}</span>
                  {b.status === 'Urgent' && <span className="urgent-tag">Urgent</span>}
                </div>
                <div className="bill-due">Due in {b.due_in_days} days</div>
              </div>
            </div>

            <div className="bill-amount">
              ₹{b.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingBills;
