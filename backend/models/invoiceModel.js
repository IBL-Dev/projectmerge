const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientId: { type: String, required: true },
  projectId: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
