const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const MenuModel = require("./models/Menu");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000/", "https://jollibee-menu.onrender.com"],
  })
);
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://rokhel121314:0Zjrcj1RBr2d3dOV@crud.64rybr2.mongodb.net/Jollibee?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const foodPrice = req.body.foodPrice;
  const foodStock = req.body.foodStock;
  const foodType = req.body.foodType;

  const menu = new MenuModel({
    foodName: foodName,
    foodPrice: foodPrice,
    foodStock: foodStock,
    foodType: foodType,
  });

  try {
    await menu.save();
    res.send("data inserted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/view", async (req, res) => {
  MenuModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const newFoodPrice = req.body.newFoodPrice;
  const id = req.body.id;

  try {
    await MenuModel.findById(id, (err, updatedFoodPrice) => {
      updatedFoodPrice.foodPrice = newFoodPrice;
      updatedFoodPrice.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await MenuModel.findByIdAndRemove(id).exec();
  res.send("food deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
