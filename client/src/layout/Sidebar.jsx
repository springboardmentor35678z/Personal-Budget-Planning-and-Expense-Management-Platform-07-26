function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="brand">
        <div className="brand-icon">BB</div>

        <div>
          <h2>BudgetBuddy</h2>
          <span>Student Finance</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-section">OVERVIEW</p>

        <button className="nav-item">
          Dashboard
        </button>


        <p className="nav-section">FINANCE</p>

        <button className="nav-item">
          Transactions
        </button>

        <button className="nav-item">
          Income
        </button>

        <button className="nav-item">
          Expenses
        </button>


        <p className="nav-section">PLANNING</p>

        <button className="nav-item">
          Budget Planning
        </button>

        <button className="nav-item active">
          Savings Goals
        </button>


        <p className="nav-section">INSIGHTS</p>

        <button className="nav-item">
          Analytics
        </button>

        <button className="nav-item">
          Reports
        </button>


        <p className="nav-section">ACCOUNT</p>

        <button className="nav-item">
          Notifications
        </button>

        <button className="nav-item">
          Profile
        </button>

        <button className="nav-item">
          Settings
        </button>

      </nav>


      <div className="sidebar-bottom">

        <div className="premium-card">
          <strong>Upgrade to Premium</strong>
          <span>AI insights + analytics</span>
        </div>

        <div className="user-card">
          <div className="user-avatar">E</div>

          <div>
            <strong>enjala</strong>
            <span>Free</span>
          </div>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar