import React, { useState, useEffect } from 'react';
import './NewInvoice.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const NewInvoice = () => {
  const navigate = useNavigate();
  
  // Client data
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
  
  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    clientId: '',
    projectId: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    description: '',
    total: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      }
    };

    fetchClients();
  }, []);
  */

  // Handle form field changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.clientId || !formData.projectId || !formData.invoiceDate || 
        !formData.dueDate || !formData.description || !formData.total) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const invoiceData = {
        clientName: formData.clientName,
        clientId: formData.clientId,
        projectId: formData.projectId,
        invoiceDate: formData.invoiceDate,
        dueDate: formData.dueDate,
        description: formData.description,
        total: parseFloat(formData.total)
      };
      
      const response = await fetch('http://localhost:8070/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit invoice');
      }
      
      alert('Invoice submitted successfully!');
      navigate('/invoice');
      
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert('Failed to submit invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="invoice-container">
      {/* Header with Logo and Company Info */}
      <div className="invoice-header">
        <div>
          <div className="invoice-title">INVOICE</div>
          <div className="company-details">
            <h3>Skill Lab pvt</h3>
            <p>
              524,Main Streat<br />
              Colombo 6,<br />
              Phone: 011 2356 985<br />
              Email: Skilllab45321@ygmail.com
            </p>
          </div>
        </div>
        <div>
          <div className="logo-placeholder">
            LOGO
          </div>
        </div>
      </div>

      {/* Client and Invoice Details */}
      <div className="details-row">
        <div className="client-details">
          <h3>Bill To:</h3>
          <div className="client-select-container">
            <p>
              <strong>Client Name:</strong>
              <select 
                className="client-select"
                onChange={handleClientSelect}
                value={formData.clientId}
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option 
                    key={client._id} 
                    value={client._id}
                  >
                    {client.clientName}
                  </option>
                ))}
              </select>
            </p>
            
            <p>
              <strong>Client ID:</strong>
              <input 
                type="text" 
                name="clientId"
                placeholder="Client ID (automatically filled)" 
                value={formData.clientId}
                onChange={handleChange}
                readOnly
              />
            </p>
          </div>

          <p>
            <strong>Project ID:</strong>
            <input 
              type="text" 
              name="projectId"
              placeholder="Project ID" 
              value={formData.projectId}
              onChange={handleChange}
            />
          </p> 
        </div>
        <div className="invoice-details">
          <p>
            <strong>Invoice Date:</strong> 
            <input 
              type="date" 
              name="invoiceDate"
              placeholder="Invoice Date" 
              value={formData.invoiceDate}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Due Date:</strong> 
            <input 
              type="date" 
              name="dueDate"
              placeholder="Due Date" 
              value={formData.dueDate}
              onChange={handleChange}
            />
          </p>
        </div>
      </div>

      <textarea 
        rows="10" 
        cols="105" 
        name="description"
        placeholder="Description..." 
        value={formData.description}
        onChange={handleChange}
        className="description-textarea"
      />

      <div className="totals">
        <div className="total-row grand-total">
          <div className="total-label">TOTAL:</div>
          <input 
            type="text" 
            name="total"
            placeholder="Total" 
            value={formData.total}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Notes Section */}
      <div className="notes">
        <h3>Notes:</h3>
        <p>Thank you for your business. Please make payment by the due date. For questions concerning this invoice, please contact our accounting department.</p>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>SkillLab Pvt | 524,Main Streat,Colombo 6 | www.skilllab45321@gmail.com</p>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default NewInvoice;