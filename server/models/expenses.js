'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ExpensesSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
});

// Compile model from schema

module.exports = mongoose.model('Expenses', ExpensesSchema);