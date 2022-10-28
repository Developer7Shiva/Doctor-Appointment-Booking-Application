const Patient = require("../model/patientSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//login patient
exports.logPatient = async (req, res) => {
 try {
   const user = await Patient.findOne({ email: req.body.email });
   if (!user) return res.status(400).json({"message":"email Id is invalid"});

   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass) return res.status(400).json({"message":"Invalid password"});
   else {
     const token = jwt.sign({ _id: user._id }, "Developer7Shiva");
    //  console.log(token);
     res.status(201).json({ "AccessToken": token, "Name":user.name , "Role": "Patient"});
   }
 } catch (err) {
   res.status(400).json({"message":"Invalid Credentials"});
 }
};

//register patient
exports.regPatient = async (req, res) => {
  // let dup = await Patient.findOne({ email: req.body.email });
  // if (dup)
  //   return res
  //     .status(400)
  //     .json("Email was already Registered. Use Another Email...");

  const rawsalt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(req.body.password, rawsalt);

  let records = new Patient({
    email: req.body.email,
    password: cryptedPassword,
    name: req.body.fName + req.body.lName,
    gender: req.body.gender,
    birthDate: new Date(req.body.birthDate),
    phone: req.body.phone,
    address: req.body.address,
    maritalStatus: req.body.maritalStatus,
    height: req.body.height,
    weight: req.body.weight,
  });
  try {
    await records.save();
    res.status(201).json({"message": "Registered Successfully"});
  } catch (err) {
    res.status(400).json({"message": "Not Registered Caused by Error"});
    console.log(err);
  }
};

//view profile
exports.viewProfile = async (req, res)=>{
  try {
    let viewed = await Patient.findById(req.user).select({ password: 0 });
    if (!viewed) {
      res.status(400).json("Patient Not Found");
    } else {
      return res.status(200).json("Patient Details: " + viewed);
    }
  } catch (err) {
    res.status(400).json("Cannot Fetch the Patient Details " + err);
    console.log("Cannot Fetch the Patient Details" + err);
  }
}

//view all patients
exports.viewPatients = async (req, res) => {
  if(req.query.limit && req.query.page){
    let lim = Number(req.query.limit);
    let pag = Number(req.query.page);
    const result = await Patient.find().limit(lim).skip((pag - 1) * lim);
    res.json(result);
  }
  else {
    try {
      let viewed = await Patient.find({}).select({ password: 0 });
      console.log("Patients Details \n" + viewed);
      res.status(200).json(viewed);
    } catch (err) {
      res.status(400).json("Cannot Fetch the Patient Details " + err);
      console.log("Cannot Fetch the Patient Details" + err);
    }
  }
};
//view patient details
exports.viewPatient = async (req, res) => {
  try {
    let viewed = await Patient.findById(req.params.id).select({ password: 0 });
    if(!viewed) {
      res.end("Patient Not Found").status(400);
    }
    else {
      return res.status(200).json("Patient Details: \n "+viewed);
    }
  } catch (err) {
    res.status(400).json("Cannot Fetch the Patient Details " + err);
    console.log("Cannot Fetch the Patient Details" + err);
  }
};

//update patient details
exports.updatePatient = async (req, res) => {
  try {
    let docs = await Patient.findByIdAndUpdate(req.params.id, req.body).select({password: 0});
    console.log(docs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json("Error During update doctor Using ID " + err);
    console.log(err);
  }
};

//delete patient using params ID
exports.deletePatient = async (req, res) => {
  console.log(req.params);
  try {
    let docs = await Patient.findByIdAndDelete(req.params.id);
    console.log(docs);
    if(docs !== null){
      res.status(200).json(" Deleted One Patient SuccessFully");
    } 
    else{ 
      res.status(400).json("Cannot Find a Patient Details")
    }
  } catch (err) {
    res.status(400).json("Error During delete d " + err);
    console.log(err);
  }
};

//delete patient using Token
exports.deletePatientToken = async (req, res) => {
  try {
    let docs = await Patient.findByIdAndDelete(req.user);
    console.log(docs);
    res.status(200).json(" Deleted SuccessFully...\n " + docs);
  } catch (err) {
    res.status(400).json("Error During delete doctor Using condition " + err);
    console.log(err);
  }
};