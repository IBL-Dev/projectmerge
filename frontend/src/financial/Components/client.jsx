import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Filter } from 'lucide-react';
import './client.css'; // Import the CSS file
import StripeCheckout from 'react-stripe-checkout';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterClient, setFilterClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/invoices/client/222222');
        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }
        const data = await response.json();
        const formattedData = data.map(invoice => ({
          _id: invoice._id,
          clientName: invoice.clientName,
          clientId: invoice.clientId,
          projectId: invoice.projectId,
          invoiceDate: new Date(invoice.invoiceDate).toLocaleDateString(),
          dueDate: new Date(invoice.dueDate).toLocaleDateString(),
          description: invoice.description,
          status: invoice.status,
          total: invoice.total.toFixed(2)
        }));
        setInvoices(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handlePayment = (id) => {
    console.log(`Processing payment for invoice: ${id}`);
    alert(`Payment initiated for invoice: ${id}`);
  };

  const applyFilters = () => {
    console.log('Applying filters:', { filterClient, startDate, endDate, minAmount, maxAmount });
  };

  const clearFilters = () => {
    setFilterClient('');
    setStartDate('');
    setEndDate('');
    setMinAmount('');
    setMaxAmount('');
  };

  const calculateTotal = () => {
    return invoices.reduce((sum, invoice) => sum + parseFloat(invoice.total), 0).toFixed(2);
  };

  if (loading) return <div className="loading-container">Loading invoices...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  function onToken(token) {
    console.log(token);
  }

  return (
    <div className="container">
      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-header">
          <Filter className="filter-icon" size={20} />
          <h2 className="filter-title">Filter Invoices</h2>
        </div>
        <div className="filter-grid">
          <div>
            <label className="filter-label filter-label-with-icon">
              <FileText size={16} style={{ marginRight: '0.25rem' }} />
              Client Name:
            </label>
            <input
              type="text"
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              placeholder="Filter by client name"
              className="filter-input"
            />
          </div>
          <div>
            <label className="filter-label">Invoice Date:</label>
            <div className="filter-row">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="filter-input"
              />
              <span>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
          <div>
            <label className="filter-label filter-label-with-icon">
              <DollarSign size={16} style={{ marginRight: '0.25rem' }} />
              Amount Range:
            </label>
            <div className="filter-row">
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Min"
                className="filter-input"
              />
              <span>to</span>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Max"
                className="filter-input"
              />
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={clearFilters} className="btn-clear">
            Clear
          </button>
          <button onClick={applyFilters} className="btn-apply">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="table-container">
        <table className="invoice-table">
          <thead className="table-header">
            <tr>
              <th className="th-cell">Client Name</th>
              <th className="th-cell">Project ID</th>
              <th className="th-cell">Invoice Date</th>
              <th className="th-cell">Due Date</th>
              <th className="th-cell">Description</th>
              <th className="th-cell">Total Amount</th>
              <th className="th-cell">Status</th>
              <th className="th-cell th-cell-center">Payment</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice._id} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <td className="td-cell">{invoice.clientName}</td>
                <td className="td-cell">{invoice.projectId}</td>
                <td className="td-cell">{invoice.invoiceDate}</td>
                <td className="td-cell">{invoice.dueDate}</td>
                <td className="td-cell">{invoice.description}</td>
                <td className="td-cell td-amount">${invoice.total}</td>
                <td className="td-cell td-amount">{invoice.status}</td>
                <td className="td-actions">
                  <button
                    onClick={() => handlePayment(invoice._id)}
                    className="btn-action btn-payment"
                    title="Process Payment"
                  >
                    <DollarSign size={18} />
                    Pay now
                  </button>
                  <StripeCheckout
                    token={onToken}
                    amount={invoice.total * 100}
                    currency="LKR"
                    stripeKey="pk_test_51RKcWvGXtvyC3fwC1EJnRLPfhJNzRNhu0HTZMQC7xNSB4nkUzxqp9sCCRmrnSX8M9cfPgjBfLdqv3sgRVrspUef800KNEfVoTr"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="summary-footer">
        <div className="summary-text">
          <span className="summary-label">Total Invoices:</span>
          <span className="badge badge-round">{invoices.length}</span>
        </div>
        <div className="summary-text">
          <span className="summary-label">Total Amount:</span>
         
          <span className="badge badge-square">${calculateTotal()}</span>
        </div>
       
        </div>
    </div>
  );
};

export default InvoiceManagement;
