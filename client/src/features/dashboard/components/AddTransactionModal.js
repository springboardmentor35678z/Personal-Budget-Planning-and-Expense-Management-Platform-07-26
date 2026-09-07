import React, { useState, useEffect } from 'react';
import './AddTransactionModal.css';

function AddTransactionModal({ isOpen, onClose, onSubmitSuccess, defaultType = 'expense' }) {
  const [type, setType] = useState(defaultType);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setType(defaultType);
    if (defaultType === 'income') {
      setCategory('Income');
    } else {
      setCategory('Food');
    }
  }, [defaultType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || parseFloat(amount) <= 0) {
      setErrorMsg('Please enter a valid title and positive amount');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await onSubmitSuccess({
        title: title.trim(),
        category,
        type,
        amount: parseFloat(amount),
        date: date || new Date().toISOString().split('T')[0],
      });
      // Reset & close
      setTitle('');
      setAmount('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Transaction</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errorMsg && <div className="form-error">{errorMsg}</div>}

          {/* Type Toggle Tabs */}
          <div className="type-toggle-group">
            <button
              type="button"
              className={`type-toggle-btn ${type === 'expense' ? 'active-expense' : ''}`}
              onClick={() => {
                setType('expense');
                if (category === 'Income') setCategory('Food');
              }}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-toggle-btn ${type === 'income' ? 'active-income' : ''}`}
              onClick={() => {
                setType('income');
                setCategory('Income');
              }}
            >
              Income
            </button>
          </div>

          <div className="form-group">
            <label>Title / Description</label>
            <input
              type="text"
              placeholder="e.g. Grocery Shopping, Salary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group flex-1">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {type === 'expense' ? (
                  <>
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Housing">Housing & Utilities</option>
                    <option value="General">General / Misc</option>
                  </>
                ) : (
                  <>
                    <option value="Income">Salary / Stipend</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment Returns</option>
                    <option value="Gift">Gift / Bonus</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
