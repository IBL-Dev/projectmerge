const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Route for creating a new invoice
router.post('/', invoiceController.createInvoice);

// Route for getting all invoices
router.get('/', invoiceController.getAllInvoices);

// Route for getting a single invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Route for updating an invoice by ID
router.put('/:id', invoiceController.updateInvoice);

// Route for deleting an invoice by ID
router.delete('/:id', invoiceController.deleteInvoice);

// Route for getting invoices by clientId
router.get('/client/:clientId', invoiceController.getInvoicesByClientId);

module.exports = router;
