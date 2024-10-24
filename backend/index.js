require("dotenv").config(); // Ensure this is at the top

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://laitonjamsanalembameitei99:${process.env.DB_PASSWORD}@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    const database = client.db("yoga-master"); // Replace with your database name
    const classesCollection = database.collection("classes");
     // Connect the client to the server	(optional starting in v4.7)
  
     const userCollection = database.collection("users");
    
     const cartCollection = database.collection("cart");
     const enrolledCollection = database.collection("enrolled");
     const paymentCollection = database.collection("payments");
     const appliedCollection = database.collection("applied"); // Replace with your collection name

    app.post("/new-class", (req, res) => {
      const newClass = req.body;
      classesCollection
        .insertOne(newClass)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((error) => {
          console.error("Insert error:", error);
          res.status(500).send("Error inserting new class.");
        });
    });

   
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("MongoDB Connected!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
