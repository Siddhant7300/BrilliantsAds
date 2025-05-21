// require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const Contact = require("./models/Contact");
const path = require("path");
require('dotenv').config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['*'],
  })
); 
app.use(express.static(path.join(__dirname, "../Front End")));

// MongoDB Connection
dbConnect();

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front End", "index.html"));  
});


app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate required fields (e.g., name, email, and message)
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, Email, and Message are required." });
  }

  try {
    // Create a new contact document instance
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    console.log(name);

    // Save the new contact document to MongoDB
    await newContact.save();  // Save the instance of the Contact model

    // Respond to the client
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "There was an error saving your message. Please try again later." });
  }
});



// Server listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
