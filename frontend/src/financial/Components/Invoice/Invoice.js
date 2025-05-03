import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import "./Invoice.css";
import { Link } from 'react-router-dom';
import UpdateInvoiceModal from './updateInvoice';
import { FaEdit, FaTrash, FaFilter, FaSearch, FaFileInvoiceDollar, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
// This import is crucial for autoTable to work properly
import autoTable from 'jspdf-autotable';

function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [useCardView, setUseCardView] = useState(window.innerWidth < 992);
  
  // Filter states
  const [filters, setFilters] = useState({
    clientName: '',
    invoiceDateFrom: '',
    invoiceDateTo: '',
    minAmount: '',
    maxAmount: ''
  });

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setUseCardView(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8070/api/invoices');
      
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      
      const data = await response.json();
      setInvoices(data);
      setError(null);
    } catch (err) {
      setError('Error fetching invoices: ' + err.message);
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete invoice
  const deleteInvoice = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`http://localhost:8070/api/invoices/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete invoice');
        }
        
        // Refresh the invoices list
        fetchInvoices();
      } catch (err) {
        setError('Error deleting invoice: ' + err.message);
        console.error('Error deleting invoice:', err);
      }
    }
  };

  // Generate PDF Report - Fixed version
  const generateReport = () => {
    if (window.confirm("Are you sure you want to generate the PDF report?")) {
      try {
        // Create new jsPDF instance
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const pdfName = `Invoices_Report_${currentDate.replace(/\//g, '-')}.pdf`;

        // Add title
        doc.setFontSize(20);
        doc.text("Invoices Report", 20, 20);

        // Add date and time
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 20, 30);
        doc.text(
          `Time: ${currentTime}`,
          doc.internal.pageSize.getWidth() - 50,
          30
        );

        // Map invoice data to table rows
        const data = filteredInvoices.map((invoice) => [
          invoice.clientName,
          invoice.projectId,
          formatDate(invoice.invoiceDate),
          formatDate(invoice.dueDate),
          invoice.description.length > 30 ? invoice.description.substring(0, 30) + '...' : invoice.description,
          invoice.total.toFixed(2),
        ]);

        // Generate table using autoTable
        autoTable(doc, {
          startY: 40,
          head: [[
            "Client Name",
            "Project ID",
            "Invoice Date",
            "Due Date",
            "Description",
            "Amount ($)"
          ]],
          body: data,
          foot: [['Total', '', '', '', '', filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0).toFixed(2)]],
          headStyles: { fillColor: "#178b1b", textColor: "#ffffff", fontStyle: 'bold' },
          footStyles: { fillColor: "#f9f9f9", textColor: "#000000", fontStyle: 'bold' },
          theme: 'grid',
        });
        
        // Add summary information
        const totalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(`Total Invoices: ${filteredInvoices.length}`, 20, totalY);
        doc.text(
          `Total Amount: $${filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0).toFixed(2)}`,
          doc.internal.pageSize.getWidth() - 80,
          totalY
        );

        // Save the PDF
        doc.save(pdfName);
        alert("PDF Report Generated Successfully!");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF: " + error.message);
      }
    }
  };

  // Handle opening update modal
  const handleUpdateClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowUpdateModal(true);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters to invoices
  const filteredInvoices = invoices.filter(invoice => {
    // Client name filter
    if (filters.clientName && !invoice.clientName.toLowerCase().includes(filters.clientName.toLowerCase())) {
      return false;
    }
    
    // Date range filter
    if (filters.invoiceDateFrom && new Date(invoice.invoiceDate) < new Date(filters.invoiceDateFrom)) {
      return false;
    }
    
    if (filters.invoiceDateTo && new Date(invoice.invoiceDate) > new Date(filters.invoiceDateTo)) {
      return false;
    }
    
    // Amount range filter
    if (filters.minAmount && invoice.total < parseFloat(filters.minAmount)) {
      return false;
    }
    
    if (filters.maxAmount && invoice.total > parseFloat(filters.maxAmount)) {
      return false;
    }
    
    return true;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Load invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Render invoice card (for mobile)
  const renderInvoiceCard = (invoice) => (
    <div className="invoice-card" key={invoice._id}>
      <div className="invoice-card-header">
        <h3 className="client-name-cell">{invoice.clientName}</h3>
        <span className="amount-cell">${invoice.total.toFixed(2)}</span>
      </div>
      <div className="invoice-card-body">
        <span className="invoice-card-label">Project ID:</span>
        <span className="id-cell">{invoice.projectId}</span>
        
        <span className="invoice-card-label">Invoice Date:</span>
        <span className="date-cell">{formatDate(invoice.invoiceDate)}</span>
        
        <span className="invoice-card-label">Due Date:</span>
        <span className="date-cell">{formatDate(invoice.dueDate)}</span>
        
        <span className="invoice-card-label">Description:</span>
        <span>{invoice.description}</span>
      </div>
      <div className="invoice-card-actions">
        <button 
          className="edit-btn" 
          onClick={() => handleUpdateClick(invoice)}
        >
          <FaEdit /> Edit
        </button>
        <button 
          className="delete-btn" 
          onClick={() => deleteInvoice(invoice._id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Nav component is already integrated with the sidebar */}
      <Nav />
      
      {/* Main content area */}
      <div className="content-area">
        {/* Invoice content container - taking full width */}
        <div className="invoice-content">
          <div className="invoice-header">
            <h1><FaFileInvoiceDollar size={24} /> Invoices</h1>
            <div className="header-buttons">
              <button className="new-invoice-btn" onClick={generateReport}>
                Generate Report
              </button>
              <Link to="/ninvoice">
                <button className="new-invoice-btn">New Invoice</button>
              </Link>
            </div>
          </div>

          <div className="">
            {/* Filter Section */}
            <div className="invoice-filters">
              <h3><FaFilter /> Filter Invoices</h3>
              <div className="filter-form">
                <div className="filter-group">
                  <label><FaSearch /> Client Name:</label>
                  <input 
                    type="text" 
                    name="clientName" 
                    value={filters.clientName} 
                    onChange={handleFilterChange} 
                    placeholder="Filter by client name"
                  />
                </div>
                
                <div className="filter-group">
                  <label><FaCalendarAlt /> Invoice Date:</label>
                  <div className="date-range">
                    <input 
                      type="date" 
                      name="invoiceDateFrom" 
                      value={filters.invoiceDateFrom} 
                      onChange={handleFilterChange} 
                    />
                    <span>to</span>
                    <input 
                      type="date" 
                      name="invoiceDateTo" 
                      value={filters.invoiceDateTo} 
                      onChange={handleFilterChange} 
                    />
                  </div>
                </div>
                
                <div className="filter-group">
                  <label><FaDollarSign /> Amount Range:</label>
                  <div className="amount-range">
                    <input 
                      type="number" 
                      name="minAmount" 
                      value={filters.minAmount} 
                      onChange={handleFilterChange} 
                      placeholder="Min"
                    />
                    <span>to</span>
                    <input 
                      type="number" 
                      name="maxAmount" 
                      value={filters.maxAmount} 
                      onChange={handleFilterChange} 
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && <div className="error-message">{error}</div>}
            
            {/* Loading indicator */}
            {loading ? (
              <div className="loading">Loading invoices...</div>
            ) : (
              <>
                {/* Invoice Table or Card View based on screen size */}
                {filteredInvoices.length > 0 ? (
                  useCardView ? (
                    <div className="invoice-cards-container">
                      {filteredInvoices.map(invoice => renderInvoiceCard(invoice))}
                    </div>
                  ) : (
                    <div className="invoice-table-container">
                      <table className="invoice-table">
                        <thead>
                          <tr>
                            <th>Client Name</th>
                            <th>Project ID</th>
                            <th>Invoice Date</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInvoices.map((invoice) => (
                            <tr key={invoice._id}>
                              <td className="client-name-cell">{invoice.clientName}</td>
                              <td className="id-cell">{invoice.projectId}</td>
                              <td className="date-cell">{formatDate(invoice.invoiceDate)}</td>
                              <td className="date-cell">{formatDate(invoice.dueDate)}</td>
                              <td className="description-cell">{invoice.description}</td>
                              <td className="amount-cell">${invoice.total.toFixed(2)}</td>
                              <td className="actions-cell">
                                <button 
                                  className="edit-btn" 
                                  onClick={() => handleUpdateClick(invoice)}
                                  title="Edit Invoice"
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className="delete-btn" 
                                  onClick={() => deleteInvoice(invoice._id)}
                                  title="Delete Invoice"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : (
                  <div className="no-invoices">No invoices found.</div>
                )}

                {/* Summary Section */}
                <div className="invoice-summary">
                  <div className="summary-item">
                    <span>Total Invoices:</span>
                    <span>{filteredInvoices.length}</span>
                  </div>
                  <div className="summary-item">
                    <span>Total Amount:</span>
                    <span>${filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0).toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Update Invoice Modal */}
      {showUpdateModal && (
        <UpdateInvoiceModal 
          invoice={selectedInvoice}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={fetchInvoices}
        />
      )}
    </div>
  );
}

export default Invoice;