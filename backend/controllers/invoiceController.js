const Invoice = require('../models/invoiceModel');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  const { clientName, clientId, projectId, invoiceDate, dueDate, description, total } = req.body;

  try {
    const newInvoice = new Invoice({ clientName, clientId, projectId, invoiceDate, dueDate, description, total });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice', error });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error });
  }
};

// Update an invoice by ID
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice', error });
  }
};

// Delete an invoice by ID
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
};


// Get a client by ID

exports.getInvoicesByClientId = async (req, res) => {
  const { clientId } = req.params;  // Extract clientId from the URL params

  try {
    // Find invoices that match the clientId
    const invoices = await Invoice.find({ clientId: clientId });
    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found for this client' });
    }
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices by clientId', error });
  }
};
