const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");

const Patient = require("./model/patientSchema");
const Admin = require("./model/adminSchema");
const Doctor = require("./model/doctorSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const corsOptions = {
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

//const Admin = require('./model/adminSchema');
const bodyParser = require("body-parser");

const adminRoute = require("./routes/adminRoutes");
const doctorRoute = require("./routes/doctorRoutes");
const patientRoute = require("./routes/patientRoutes");
// const scheduleRoute = require("./routes/scheduleRoute");
const app = express();
app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

//loading mongo config file
let mongoConfig = JSON.stringify(
  JSON.parse(fs.readFileSync("./config/mongoConfig.json", "utf8"))
);
//console.log(JSON.stringify(mongoConfig));
let a = mongoConfig.slice(13, -2); //.endsWith("majority");
//console.log(a);

//DB Connection
mongoose.connect(
  a,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Mongo DB Connected...!");
    } else {
      console.log("Error Occured DB Not Connected.." + err);
    }
  }
);

//Login Page

app.post("/api/login", async (req, res) => {
  const user1 = await Admin.findOne({ email: req.body.email });
  if (user1 === null) {
    const user2 = await Doctor.findOne({ email: req.body.email });
    if (user2 === null) {
      const user3 = await Patient.findOne({ email: req.body.email });
      if (user3 === null)
        return res
          .status(400)
          .send({ message: "You're Account wasn't Registerd." });

      let validPass = await bcrypt.compare(req.body.password, user3.password);
      if (!validPass)
        return res.status(400).send({ message: "Invalid password" });
      else {
        const token = jwt.sign({ _id: user3._id }, "Developer7Shiva");
        res
          .status(201)
          .json({ AccessToken: token, Name: user3.name, Role: "Patient" });
      }
    } else {
      if (!user2) return res.status(400).send("Email Id is Invalid");

      let validPass = await bcrypt.compare(req.body.password, user2.password);
      if (!validPass) return res.status(400).send("\n Invalid password");
      else {
        const token = jwt.sign({ _id: user2._id }, "Developer_7_Shiva");
        res
          .status(201)
          .json({ AccessToken: token, Name: user2.name, Role: "Doctor" });
      }
    }
  } else {
    if (!user1) return res.status(400).send({ message: "Email Id is Invalid" });

    let validPass = await bcrypt.compare(req.body.password, user1.password);
    if (!validPass)
      return res.status(400).send({ message: "Invalid password" });
    else {
      const token = jwt.sign({ _id: user1._id }, "Developer_7_Siva");
      res
        .status(201)
        .json({ AccessToken: token, Name: user1.name, Role: "Admin" });
    }
  }
});

app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);

//Listening Port setup
app.listen(3000, () => {
  console.log("Server is Running on http://localhost:3000");
});
