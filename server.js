const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const model1 = require("./models/model1");
const model2 = require("./models/model2");

var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "My backend task." });
});

// get data from mock_data1
app.get("/getData1", async(req, res) => {
  try{
    const data1 = await model1.find()
    res.json(data1)
  } catch (err) {
    res.status(500).json({message: err.message})
  } 
});
// get data from mock_data2
app.get("/getData2", async(req, res) => {
  try{
    const data2 = await model2.find()
    res.json(data2)
  } catch (err) {
    res.status(500).json({message: err.message})
  } 
});
// final route
app.get("/getData", async(req, res) => {
  try{
    data = await model1.aggregate([
      { $lookup:
         {
           from: 'mock_data2',
           localField: 'email',
           foreignField: 'email',
           as: 'mydata'
         }
        },
         {
          "$project": {
            "_id": 1,
            "city": 1,
            "email": 1,
            "full_name": 1,
            "number": 1,
            "url": 1,
            "mydata._id": 1,
            "mydata.team_name": 1
          }
        
       }
      ])
    res.json(data)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});
// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;

