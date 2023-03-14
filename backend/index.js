const express = require("express");
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
require("./db/config");
const app = express();

const Jwt = require("jsonwebtoken");
const jwtKey = "e-commDash";

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send("Something went wrong please try again later!");
    }
    res.send({ result, auth: token });
  });
});

app.post("/product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (req.body.password && req.body.email) {
    if ({ user }) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send("Something went wrong please try again later!");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send("user not found");
    }
  } else {
    res.send("user not found");
  }
});

app.get("/products", verifyToken ,async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products" });
  }
});

app.delete("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send("no data found");
  }
});

app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken,async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req,res,next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result: "please provide valid token"})
      }else{
        next();
      }
    })
  }else{
    res.status(403).send({result: "please send token with header"})
  }
}

app.listen(5000);
