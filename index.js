require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASSWORD}@cluster0.szsdpic.mongodb.net/Stocks?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, )

//Create Schema
const watchListSchema = {
  stock: String
}

//Create Model
const Stock = mongoose.model("Stock", watchListSchema)



app.listen(3001, () =>{
  console.log("server is running")
})

app.get("/api/getList", (req,res) =>{
  Stock.find({})
  .then(data =>{
    res.json(data)
  }).catch(err =>{
    console.error(err);
    res.status(500).send("Internal Error Server")
  })
  })

app.post("/api/addWatchlist", (req,res) =>{
  const symbol = req.body.symbol;
  let newStock = new Stock({
    stock : symbol
  })
  newStock.save()
  //sends this response to the frontend
  res.json({message: "Stock added successfuly"})
})

app.delete("/api/delete", (req,res) =>{
  const symbol = req.body.symbol;
  console.log(symbol)
  Stock.deleteOne({stock: symbol}).then( () => res.json({message: "Stock deleted successfully"}))
  .catch( e => console.log(e))
})


