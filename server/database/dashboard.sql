-- Dashboard SQL Database Schema & Development Seed Data
-- Personal Budget Planning & Expense Management Platform

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    plan_type TEXT DEFAULT 'Student Plan',
    avatar_initials TEXT DEFAULT 'AC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Budgets Table
CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    allocated_amount REAL NOT NULL,
    spent_amount REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Savings Goals Table
CREATE TABLE IF NOT EXISTS savings_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    target_amount REAL NOT NULL,
    current_amount REAL NOT NULL,
    color_badge TEXT DEFAULT 'blue',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Upcoming Bills Table
CREATE TABLE IF NOT EXISTS upcoming_bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    due_in_days INTEGER NOT NULL,
    status TEXT DEFAULT 'Upcoming',
    icon_type TEXT DEFAULT 'default',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    level TEXT NOT NULL,
    dot_color TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Development Seed Data (Alex Chen - User ID 1)
INSERT INTO users (id, name, email, plan_type, avatar_initials)
SELECT 1, 'Alex Chen', 'alex.chen@example.com', 'Student Plan', 'AC'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 1);

-- Seed Transactions for User 1 (Current & Historical for Chart)
INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Swiggy Order', 'Food', 'expense', 380.0, '2025-07-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Swiggy Order');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Salary / Stipend', 'Income', 'income', 15000.0, '2025-07-01'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Salary / Stipend');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Uber Ride', 'Transport', 'expense', 180.0, '2025-07-25'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Uber Ride');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Amazon Purchase', 'Shopping', 'expense', 1299.0, '2025-07-20'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Amazon Purchase');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Netflix', 'Entertainment', 'expense', 649.0, '2025-07-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Netflix');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Freelance Payment', 'Income', 'income', 3500.0, '2025-07-10'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Freelance Payment');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Rent Payment', 'Housing', 'expense', 7732.0, '2025-07-05'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Rent Payment');

-- Historical Monthly Summary Seed Entries for 6M Overview (Feb-Jun)
INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Feb Income', 'Income', 'income', 12000.0, '2025-02-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Feb Income');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Feb Expenses', 'General', 'expense', 8500.0, '2025-02-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Feb Expenses');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Mar Income', 'Income', 'income', 13500.0, '2025-03-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Mar Income');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Mar Expenses', 'General', 'expense', 9000.0, '2025-03-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Mar Expenses');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Apr Income', 'Income', 'income', 14000.0, '2025-04-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Apr Income');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Apr Expenses', 'General', 'expense', 8800.0, '2025-04-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Apr Expenses');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'May Income', 'Income', 'income', 14500.0, '2025-05-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'May Income');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'May Expenses', 'General', 'expense', 9500.0, '2025-05-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'May Expenses');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Jun Income', 'Income', 'income', 15000.0, '2025-06-15'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Jun Income');

INSERT INTO transactions (user_id, title, category, type, amount, date)
SELECT 1, 'Jun Expenses', 'General', 'expense', 9100.0, '2025-06-28'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE user_id = 1 AND title = 'Jun Expenses');

-- Seed Budgets
INSERT INTO budgets (user_id, category, allocated_amount, spent_amount)
SELECT 1, 'Food', 4000.0, 3520.0
WHERE NOT EXISTS (SELECT 1 FROM budgets WHERE user_id = 1 AND category = 'Food');

-- Seed Savings Goals
INSERT INTO savings_goals (user_id, name, target_amount, current_amount, color_badge)
SELECT 1, 'Emergency Fund', 50000.0, 18000.0, 'blue'
WHERE NOT EXISTS (SELECT 1 FROM savings_goals WHERE user_id = 1 AND name = 'Emergency Fund');

INSERT INTO savings_goals (user_id, name, target_amount, current_amount, color_badge)
SELECT 1, 'New Laptop', 35000.0, 22000.0, 'green'
WHERE NOT EXISTS (SELECT 1 FROM savings_goals WHERE user_id = 1 AND name = 'New Laptop');

INSERT INTO savings_goals (user_id, name, target_amount, current_amount, color_badge)
SELECT 1, 'Goa Trip', 12000.0, 5500.0, 'orange'
WHERE NOT EXISTS (SELECT 1 FROM savings_goals WHERE user_id = 1 AND name = 'Goa Trip');

-- Seed Upcoming Bills
INSERT INTO upcoming_bills (user_id, title, amount, due_in_days, status, icon_type)
SELECT 1, 'Rent Credit check', 8000.0, 3, 'Urgent', 'house'
WHERE NOT EXISTS (SELECT 1 FROM upcoming_bills WHERE user_id = 1 AND title = 'Rent Credit check');

INSERT INTO upcoming_bills (user_id, title, amount, due_in_days, status, icon_type)
SELECT 1, 'Electricity Bill', 1200.0, 7, 'Due soon', 'zap'
WHERE NOT EXISTS (SELECT 1 FROM upcoming_bills WHERE user_id = 1 AND title = 'Electricity Bill');

INSERT INTO upcoming_bills (user_id, title, amount, due_in_days, status, icon_type)
SELECT 1, 'Spotify Premium', 149.0, 10, 'Upcoming', 'music'
WHERE NOT EXISTS (SELECT 1 FROM upcoming_bills WHERE user_id = 1 AND title = 'Spotify Premium');

INSERT INTO upcoming_bills (user_id, title, amount, due_in_days, status, icon_type)
SELECT 1, 'Mobile Recharge', 299.0, 14, 'Upcoming', 'phone'
WHERE NOT EXISTS (SELECT 1 FROM upcoming_bills WHERE user_id = 1 AND title = 'Mobile Recharge');

-- Seed Alerts
INSERT INTO alerts (user_id, title, description, level, dot_color)
SELECT 1, 'Budget warning', 'Food budget at 88% — ₹480 remaining', 'warning', 'yellow'
WHERE NOT EXISTS (SELECT 1 FROM alerts WHERE user_id = 1 AND title = 'Budget warning');

INSERT INTO alerts (user_id, title, description, level, dot_color)
SELECT 1, 'Goal milestone', 'Emergency fund crossed 35%!', 'milestone', 'green'
WHERE NOT EXISTS (SELECT 1 FROM alerts WHERE user_id = 1 AND title = 'Goal milestone');

INSERT INTO alerts (user_id, title, description, level, dot_color)
SELECT 1, 'Bill reminder', 'Rent due in 3 days — ₹8,000', 'reminder', 'blue'
WHERE NOT EXISTS (SELECT 1 FROM alerts WHERE user_id = 1 AND title = 'Bill reminder');
