const express = require('express')

const valid = (req, res, next) => {
    let { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;
  
    if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || veg === undefined) {
      res.status(400).send("All fields are required.");
    } else {
      next();
    }
}
module.exports = valid