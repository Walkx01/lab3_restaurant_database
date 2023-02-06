const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
cuisine :{
    type: String,
    required: true
},
name :{
    type: String,
    required: true
},
city :{
    type: String,
    required: true
},
restaurant_id :{
    type: String,
    required: true
},
address: {
    street: {
      type: String,
     
    },
    building: {
      type: String,
      
    },
    zipcode: {
      type: String,
     
    }
  },


});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant