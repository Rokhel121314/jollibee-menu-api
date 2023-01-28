const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: Number,
    required: true,
  },
  foodStock: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("FoodMenu", MenuSchema);
module.exports = Menu;
