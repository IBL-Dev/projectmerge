import React, { useState, useEffect } from 'react';
import './updateInvoice.css';

function UpdateInvoiceModal({ invoice, onClose, onUpdate }) {
  // Sample client data - same as in NewInvoice component
  const [clients, setClients] = useState([
    {
      "_id": "222222",
      "clientName": "John Doe"
    },
    {
      "_id": "781309dbaee3ed1d56528a4f",
      "clientName": "Jane Smith"
    },
    {
      "_id": "881309dbaee3ed1d56528a5a",
      "clientName": "Alice Johnson"
    },
    {
      "_id": "981309dbaee3ed1d56528a6b",
      "clientName": "Bob Brown"
    }
  ]);

  const [formData, setFormData] = useState({
    clientName: invoice.clientName,
    clientId: invoice.clientId,
    projectId: invoice.projectId,
    invoiceDate: invoice.invoiceDate.split('T')[0], // Format date for input
    dueDate: invoice.dueDate.split('T')[0], // Format date for input
    description: invoice.description,
    total: invoice.total
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Optional: Fetch clients from API
  /*
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clients');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Error loading clients. Please try again later.');
      }
    };

    fetchClients();
  }, []);
  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle client selection from dropdown
  const handleClientSelect = (e) => {
    const selectedClientId = e.target.value;
    
    if (selectedClientId === "") {
      // If "Select a client" option is chosen
      setFormData(prev => ({
        ...prev,
        clientName: '',
        clientId: ''
      }));
      return;
    }
    
    // Find the selected client and update both name and ID
    const selectedClient = clients.find(client => client._id === selectedClientId);
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        clientName: selectedClient.clientName,
        clientId: selectedClient._id
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8070/api/invoices/${invoice._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientId: formData.clientId,
          projectId: formData.projectId,
          invoiceDate: formData.invoiceDate,
          dueDate: formData.dueDate,
          description: formData.description,
          total: parseFloat(formData.total)
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }
      
      // Call the onUpdate function to refresh the invoice list
      onUpdate();
      
      // Close the modal
      onClose();
    } catch (err) {
      setError('Error updating invoice: ' + err.message);
      console.error('Error updating invoice:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="update-modal">
        <div className="modal-header">
          <h2>Update Invoice</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientSelect">Client Name</label>
            <select
              id="clientSelect"
              className="client-select"
              value={formData.clientId}
              onChange={handleClientSelect}
              required
            >
              <option value="">Select a client</option>
              {clients.map(client => (
                <option 
                  key={client._id} 
                  value={client._id}
                  selected={client._id === formData.clientId}
                >
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="clientId">Client ID</label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              readOnly
              className="readonly-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectId">Project ID</label>
            <input
              type="text"
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                type="date"
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="total">Total Amount</label>
            <input
              type="number"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="update-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateInvoiceModal;