const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/dashboard';

/**
 * Fetches consolidated dashboard data from the backend API.
 * @param {string} range Timeframe for monthly overview ('1M', '3M', '6M')
 * @returns {Promise<Object>} Dashboard data payload
 */
export async function fetchDashboardData(range = '6M') {
  try {
    const response = await fetch(`${API_BASE_URL}/data?range=${range}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
}

/**
 * Adds a new income or expense transaction.
 * @param {Object} transactionData { title, category, type, amount, date }
 * @returns {Promise<Object>} Created transaction
 */
export async function addTransaction(transactionData) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': '1',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.detail || 'Failed to submit transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}
