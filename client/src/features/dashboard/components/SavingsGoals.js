import React from 'react';
import './SavingsGoals.css';

function SavingsGoals({ goals = [] }) {
  return (
    <div className="savings-goals-card">
      <div className="card-header">
        <h3 className="section-title">Savings Goals</h3>
      </div>

      <div className="goals-list">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round(g.progress_percentage || 0));
          return (
            <div key={g.id} className="goal-item">
              <div className="goal-info">
                <div className="goal-name-badge">
                  <span className="goal-name">{g.name}</span>
                  <span className={`goal-badge badge-${g.color_badge || 'blue'}`}>{pct}%</span>
                </div>
                <div className="goal-amounts">
                  ₹{g.current_amount.toLocaleString()} of ₹{g.target_amount.toLocaleString()}
                </div>
              </div>

              <div className="progress-bar-bg">
                <div
                  className={`progress-bar-fill fill-${g.color_badge || 'blue'}`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavingsGoals;
