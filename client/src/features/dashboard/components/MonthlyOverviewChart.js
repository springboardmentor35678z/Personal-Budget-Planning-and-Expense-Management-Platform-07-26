import React, { useState } from 'react';
import './MonthlyOverviewChart.css';

function MonthlyOverviewChart({ data = [], activeRange = '6M', onRangeChange }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const ranges = ['1M', '3M', '6M'];

  // SVG Chart Geometry Constants
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const maxVal = Math.max(
    20000,
    ...data.map((d) => Math.max(d.income || 0, d.expense || 0))
  );

  // Compute SVG Coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * chartW;
    const yIncome = height - paddingY - (d.income / maxVal) * chartH;
    const yExpense = height - paddingY - (d.expense / maxVal) * chartH;
    return { ...d, x, yIncome, yExpense };
  });

  const incomePath = points.length > 0
    ? points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.yIncome}`, '')
    : '';

  const expensePath = points.length > 0
    ? points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.yExpense}`, '')
    : '';

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-area">
          <h3>Monthly Overview</h3>
          <p className="chart-subtitle">Income vs Expenses over time</p>
        </div>

        <div className="chart-controls">
          <div className="legend-items">
            <span className="legend-item">
              <span className="dot income-dot"></span> Income
            </span>
            <span className="legend-item">
              <span className="dot expense-dot"></span> Expenses
            </span>
          </div>

          <div className="range-selector">
            {ranges.map((r) => (
              <button
                key={r}
                className={`range-btn ${activeRange === r ? 'active' : ''}`}
                onClick={() => onRangeChange && onRangeChange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart">
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingY + ratio * chartH;
            const val = Math.round(maxVal * (1 - ratio));
            return (
              <g key={ratio}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} className="grid-line" />
                <text x={paddingX - 8} y={y + 4} className="axis-text axis-y">
                  ₹{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Income Line */}
          {incomePath && (
            <path d={incomePath} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* Expense Line */}
          {expensePath && (
            <path d={expensePath} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i} className="chart-point-group" onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)}>
              {/* Income Circle */}
              <circle cx={p.x} cy={p.yIncome} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
              {/* Expense Circle */}
              <circle cx={p.x} cy={p.yExpense} r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
              
              {/* Month X Axis Label */}
              <text x={p.x} y={height - 8} className="axis-text axis-x">
                {p.month}
              </text>
            </g>
          ))}
        </svg>

        {hoveredPoint && (
          <div className="chart-tooltip" style={{ left: `${(hoveredPoint.x / width) * 100}%` }}>
            <div className="tooltip-month">{hoveredPoint.month}</div>
            <div className="tooltip-row income">Income: ₹{hoveredPoint.income.toLocaleString()}</div>
            <div className="tooltip-row expense">Expense: ₹{hoveredPoint.expense.toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyOverviewChart;
