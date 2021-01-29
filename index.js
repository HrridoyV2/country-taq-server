const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require("body-parser");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xya9j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());
app.use(express());
const port = 5000;



client.connect((err) => {
  const countries = client.db("Aspyrer").collection("all_country");
  const userTaq = client.db("Aspyrer").collection("user_taqs");
  
 
  console.log("Database connected");

  app.get('/getCountries', (req, res) => {
    countries.find({})
    .toArray((err, document) => {
        res.send(document)
    })
    app.post('/addTaq', (req, res) => {
      const values = req.body
      console.log(req.body);
      userTaq.insertOne(values).then(result => {
        res.send(result.insertedCount > 0)
      })
    })
})
  

});

app.get("/", (req, res) => {
  res.send("Application is working successfully");
});

app.listen(port || process.env.PORT);