const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();



//Read ALL
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {

    //Sorting
    //use "asc", "desc", "ascending", "descending", 1, or -1
    //const employees = await employeeModel.find({}).sort({'firstname': -1});
    
    //Select Specific Column
    //const employees = await employeeModel.find({}).select("firstname lastname salary").sort({'salary' : 'desc'});  

    if (!req.query.sortBy) {
    const restaurants = await restaurantModel.find({});
    
    console.log("no sortBY provided")
    try {
   
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
      }
      else{
        console.log(" sortBY provided")
        const sortBy = req.query.sortBy;

        try {
            let restaurants;
            if (sortBy.toLowerCase() === 'asc' ) {
              restaurants = await restaurantModel.find({}).select(" id  cuisine  name city restaurant_id ").sort({'restaurant_id' : 'asc'});  

            } else {
                restaurants = await restaurantModel.find({}).select(" id  cuisine  name city restaurant_id ").sort({'restaurant_id' : 'desc'});  
            }
            res.status(200).json(restaurants);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
      }
   
  });


     
//  http://localhost:3000/restaurants/cuisine/Japanese
  app.get('/restaurants/cuisine/:cuisine', (req, res) => {
       restaurantModel.find({ cuisine: req.params.cuisine }, (error, restaurants) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(restaurants);
      }
    });
  });

//   http://localhost:3000/restaurants/Delicatessen
  app.get('/restaurants/Delicatessen',async (req, res) => {

  

    try{

        let restaurants = await restaurantModel.find({ cuisine: "Delicatessen" }).select(" cuisine  name city  ").sort({'name' : 'asc'});  
        restaurants = restaurants.filter(( resto)=> resto.city != "Brooklyn");
        res.status(200).json(restaurants);
    }
   
    catch (error) {
        res.status(500).json({ error: error.message });
      }
   

});



  module.exports = app