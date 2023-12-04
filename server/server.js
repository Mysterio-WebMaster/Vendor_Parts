var express = require('express');
var app = express();
var { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var port = 5000;
// var port = 8080;

app.use(bodyParser.json())
app.use(cors());

async function Connection(uri) {

  try {

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    }
    );

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return { status: 201, client: client, };
  } catch (error) {
    return { status: 500, client: error };
  }
}

app.post("/connect", async (req, res) => {
  let { uri } = req.body;
  var result = await Connection(uri)
  res.json({ status: result.status })
})


app.listen(port, () => {
  console.log("Server is running on port: " + port);
})