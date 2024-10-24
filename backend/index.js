require("dotenv").config(); // Ensure this is at the top

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const database = client.db("yoga-master"); 
     classesCollection = database.collection("classes");
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
    app.get('/classes', async (req, res) => {
      const query = { status: 'approved' };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
  })
     
    // GET ALL CLASSES ADDED BY INSTRUCTOR
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { instructorEmail: email };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/classes-manage", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });
    app.patch("/change-status/:id", async (req, res) => {
      const id = req.params.id;
      const { status, reason } = req.body;
    
      // Validate the input
      if (!status) {
        return res.status(400).send("Status is required.");
      }
    
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
          reason: reason,
        },
      };
    
      try {
        // Perform the update operation
        const result = await classesCollection.updateOne(filter, updateDoc);
    
        // Check if any document was matched
        if (result.matchedCount === 0) {
          return res.status(404).send("Class not found.");
        }
    
        // Retrieve the updated document
        const updatedClass = await classesCollection.findOne(filter);
        res.send(updatedClass); // Send the updated document back
      } catch (error) {
        console.error("Update error:", error);
        res.status(500).send("Error updating class status.");
      }
    });
    
    app.get('/approved-classes',async(req,res)=>{
      const query={status:'Pending'};
      const result= await classesCollection.find(query).toArray();
      res.send(result)

    })

    //get Single classes details
   // Get single class details
app.get("/class/:id", async (req, res) => {
  const id = req.params.id; // Change this to get the correct parameter
  const query = { _id: new ObjectId(id) };

  
    // Use findOne to retrieve a single document
    const result = await classesCollection.findOne(query);

  

    res.send(result);
  
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
