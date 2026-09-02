import React, { useState, useEffect, useCallback } from 'react';
import MetricCard from './MetricCard';
import MonthlyOverviewChart from './MonthlyOverviewChart';
import QuickActions from './QuickActions';
import RecentTransactions from './RecentTransactions';
import SavingsGoals from './SavingsGoals';
import UpcomingBills from './UpcomingBills';
import AlertsPanel from './AlertsPanel';
import AddTransactionModal from './AddTransactionModal';
import { fetchDashboardData, addTransaction } from '../services/dashboardService';
import './DashboardPage.css';

function DashboardPage({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRange, setActiveRange] = useState('6M');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultType, setModalDefaultType] = useState('expense');

  const loadData = useCallback(async (range = '6M') => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDashboardData(range);
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(activeRange);
  }, [activeRange, loadData]);

  const handleRangeChange = (newRange) => {
    setActiveRange(newRange);
  };

  const handleOpenAddModal = (type = 'expense') => {
    setModalDefaultType(type);
    setIsModalOpen(true);
  };

  const handleAddTransactionSubmit = async (transactionPayload) => {
    await addTransaction(transactionPayload);
    // Refresh dashboard data
    await loadData(activeRange);
  };

  if (loading && !data) {
    return (
      <div className="dashboard-state-container">
        <div className="loading-spinner"></div>
        <p>Loading your financial dashboard...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="dashboard-state-container error-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>Unable to load Dashboard</h3>
        <p>{error}</p>
        <button className="retry-btn" onClick={() => loadData(activeRange)}>
          Retry Loading
        </button>
      </div>
    );
  }

  const { summary, monthlyOverview, recentTransactions, alerts, savingsGoals, upcomingBills } = data || {};

  return (
    <div className="dashboard-page">
      {/* 1. Hero / Greeting Header */}
      <div className="hero-section">
        <div className="hero-text">
          <h2 className="greeting-title">Good morning, Alex</h2>
          <p className="greeting-subtitle">
            Wednesday, July 30, 2025 &mdash; here&apos;s your financial snapshot
          </p>
        </div>

        <button className="add-tx-btn" onClick={() => handleOpenAddModal('expense')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Transaction
        </button>
      </div>

      {/* 2. Four Key Metrics Row */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Balance"
          amount={summary?.balance ?? 24580}
          subtext={`↑ ${summary?.balanceTrend || '₹5,260 this month'}`}
          trendType="green"
          iconType="wallet"
        />
        <MetricCard
          title="Monthly Income"
          amount={summary?.income ?? 15500}
          subtext={summary?.incomeTrend || '↑ 3.3% vs last month'}
          trendType="green"
          iconType="trending-up"
        />
        <MetricCard
          title="Monthly Spend"
          amount={summary?.spend ?? 10240}
          subtext={summary?.spendTrend || '↑ 12.5% vs last month'}
          trendType="red"
          iconType="trending-down"
        />
        <MetricCard
          title="Savings Rate"
          amount={`${summary?.savingsRate ?? 33.9}%`}
          subtext="On track for July"
          trendType="purple"
          iconType="piggy-bank"
        />
      </div>

      {/* 3. AI Insights Banner */}
      <div className="ai-insights-banner">
        <div className="ai-banner-left">
          <div className="lock-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div className="banner-text">
            <span className="banner-title">AI Insights</span>
            <span className="banner-desc">&mdash; Available on Premium plan</span>
          </div>
        </div>

        <button className="upgrade-pill-btn">Upgrade to Premium</button>
      </div>

      {/* 4. Main 2-Column Body Layout */}
      <div className="dashboard-body-grid">
        {/* Left Column (Wide) */}
        <div className="body-left-column">
          <MonthlyOverviewChart
            data={monthlyOverview || []}
            activeRange={activeRange}
            onRangeChange={handleRangeChange}
          />
          <RecentTransactions transactions={recentTransactions || []} />
        </div>

        {/* Right Column (Narrow) */}
        <div className="body-right-column">
          <QuickActions
            onOpenAddTransaction={handleOpenAddModal}
            onNavigate={onNavigate}
          />
          <AlertsPanel alerts={alerts || []} />
          <SavingsGoals goals={savingsGoals || []} />
          <UpcomingBills bills={upcomingBills || []} />
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleAddTransactionSubmit}
        defaultType={modalDefaultType}
      />
    </div>
  );
}

export default DashboardPage;
