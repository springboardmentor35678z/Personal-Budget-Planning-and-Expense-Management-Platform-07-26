import React from 'react';
import './QuickActions.css';

function QuickActions({ onOpenAddTransaction, onNavigate }) {
  const actions = [
    {
      id: 'add-expense',
      label: 'Add Expense',
      colorClass: 'pink',
      onClick: () => onOpenAddTransaction && onOpenAddTransaction('expense'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      id: 'add-income',
      label: 'Add Income',
      colorClass: 'green',
      onClick: () => onOpenAddTransaction && onOpenAddTransaction('income'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      ),
    },
    {
      id: 'view-expenses',
      label: 'View Expenses',
      colorClass: 'blue',
      onClick: () => onNavigate && onNavigate('Expenses'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'view-income',
      label: 'View Income',
      colorClass: 'purple',
      onClick: () => onNavigate && onNavigate('Income'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      ),
    },
    {
      id: 'my-profile',
      label: 'My Profile',
      colorClass: 'yellow',
      onClick: () => onNavigate && onNavigate('Profile'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'goals',
      label: 'Goals',
      colorClass: 'teal',
      onClick: () => onNavigate && onNavigate('Goals'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
  ];

  return (
    <div className="quick-actions-card">
      <h3 className="section-title">Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((act) => (
          <button key={act.id} className={`action-tile ${act.colorClass}`} onClick={act.onClick}>
            <div className="action-icon">{act.icon}</div>
            <span className="action-label">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
