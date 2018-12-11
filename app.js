const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const Order = require('./schemas/order')
const PORT = 3000

const app = new express()

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/coffeeshop');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.log("We are connected to the database..")
});


app.get('/orders',(req,res) =>{

  // find all the documents in the post collection
  Order.find({},(error,orders) =>{
    res.json(orders)
  })
})

app.post('/orders', (req,res) => {

  let name = req.body.name
  let orderDate = req.body.order_Date
  let coffee = req.body.coffee
  let email = req.body.email

  // create the new post model
  let order = new Order ({name: name, orderDate: orderDate, coffee: coffee, email: email})

  order.save((error,newOrder) => {

    if(error) {
      res.status(500).json({error: 'Unable to create post!'})
      return
    }

    res.json(newOrder)

  })

})



app.listen(PORT,() => {
  console.log("Server is running...")
})
