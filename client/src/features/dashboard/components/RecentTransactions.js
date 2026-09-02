import React from 'react';
import './RecentTransactions.css';

function RecentTransactions({ transactions = [] }) {
  const getCategoryClass = (category = '') => {
    const cat = category.toLowerCase();
    if (cat.includes('food')) return 'cat-food';
    if (cat.includes('income')) return 'cat-income';
    if (cat.includes('transport') || cat.includes('uber')) return 'cat-transport';
    if (cat.includes('shopping') || cat.includes('amazon')) return 'cat-shopping';
    if (cat.includes('entertainment') || cat.includes('netflix')) return 'cat-entertainment';
    return 'cat-default';
  };

  return (
    <div className="transactions-card">
      <div className="transactions-header">
        <div>
          <h3 className="section-title">Recent Transactions</h3>
          <p className="section-subtitle">Your last {transactions.length} transactions</p>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">No recent transactions found</div>
        ) : (
          transactions.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div key={tx.id} className="transaction-item">
                <div className="tx-left">
                  <span className={`category-badge ${getCategoryClass(tx.category)}`}>
                    {tx.category}
                  </span>
                  <div className="tx-info">
                    <div className="tx-title">{tx.title}</div>
                    <div className="tx-date">{tx.date}</div>
                  </div>
                </div>

                <div className={`tx-amount ${isIncome ? 'income' : 'expense'}`}>
                  {isIncome ? `+₹${tx.amount.toLocaleString()}` : `₹${tx.amount.toLocaleString()}`}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="transactions-footer">
        <button className="view-all-btn">
          View all transactions &rarr;
        </button>
      </div>
    </div>
  );
}

export default RecentTransactions;
