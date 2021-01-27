const express = require('express');
const router = express.Router();
const Categories = require('../models/categories');

module.exports = function() {
  /* Get categories listings */
  router.get('/read', async (req, res) => {
    try {
      let directory_list = await Categories.find({});
      res.send(directory_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an expense entry */
  router.post("/create", async ( req, res ) => {
    const { title, description, } = req.body;
      let categories = new Categories({
        title,
        description,
      });
      try{
        let newCategory = await categories.save();
        res.send({ response: 'success'});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get a listing by a category id */
  router.get('/readbyid/', async ( req, res ) => {
     try {
       let record = await Categories.findOne({ _id: req.query.id });
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });
     
  /* Update a category entry */
  router.put('/update', async ( req, res ) => {
      try {
        let categories = await Categories.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete category entry */
  router.delete('/delete', async (req, res) => {
      try {
        let categories = await Categories.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};