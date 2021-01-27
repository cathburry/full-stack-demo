const express = require('express');
const router = express.Router();
const Expenses = require('../models/expenses');

module.exports = function() {

  /* Get expenses listings */
  router.get('/read', async (req, res) => {
    try {
      let directory_list = await Expenses.find({});
      res.send(directory_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an expense entry */
  router.post("/create", async ( req, res ) => {
    const { title, category, date, value } = req.body;
      let expenses = new Expenses({
        title,
        category,
        date,
        value,
      });
      try{
        let newExpense = await expenses.save();
        res.send({ response: 'success'});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get a listing by a expense id */
  router.get('/readbyid/', async ( req, res ) => {
     try {
       let record = await Expenses.findOne({ _id: req.query.id });
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });
     
  /* Update an expense entry */
  router.put('/update', async ( req, res ) => {
      try {
        let expenses = await Expenses.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete expense entry */
  router.delete('/delete', async (req, res) => {
      try {
        let expenses = await Expenses.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};