import React from 'react';
import './MetricCard.css';

function MetricCard({ title, amount, subtext, isPositive, trendType = 'green', iconType }) {
  // Format currency with Indian Rupee symbol if numeric
  const formattedAmount = typeof amount === 'number'
    ? `₹${amount.toLocaleString('en-IN')}`
    : amount;

  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {iconType && (
          <div className={`metric-icon-badge ${trendType}`}>
            {iconType === 'wallet' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            )}
            {iconType === 'trending-up' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            )}
            {iconType === 'trending-down' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            )}
            {iconType === 'piggy-bank' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-3.5c1-.8 1.5-1.8 1.5-3.5 0-4.5-2.5-7-6.5-7z" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="metric-amount">{formattedAmount}</div>

      <div className={`metric-subtext ${trendType}`}>
        {subtext}
      </div>
    </div>
  );
}

export default MetricCard;
