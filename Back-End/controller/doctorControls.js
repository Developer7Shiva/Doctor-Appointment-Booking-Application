const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/doctorSchema");
const Patient = require("../model/patientSchema");

//doctor Registration
exports.regDoctor = async (req, res) => {
  const rawsalt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(req.body.password, rawsalt);
  let doct = new Doctor({
    email: req.body.email,
    password: cryptedPassword,
    name: req.body.fName + req.body.lName,
    gender: req.body.gender,
    birthDate: new Date(req.body.birthDate),
    phone: req.body.phone,
    address: req.body.address,
    qualification: req.body.qualification,
    expertise: req.body.expertise,
    licenseNo: req.body.licenseNo,
    licenseExp: new Date(req.body.licenseExp),
  });
  console.log(doct);
  try {
    const registred = await doct.save();
    res.status(201).json("New Doctor Created...\n" + registred);
  } catch (err) {
    res.status(400).json("Error During New Doctor Creation \n");
    console.log(err);
  }
};

//view doctors list
exports.viewDoctors = async (req, res) => {
  try {
    let view = await Doctor.find({}).select({ password: 0 });
    if (!view) return res.json("Doctors are Currently Unavailable");
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json("Cannot Retrieve Doctors list " + err);
    console.log("Cannot Retrieve the Doctor list" + err);
  }
};

//view one doctor details using token
exports.viewProfile = async (req, res) => {
  try {
    let viewed = await Doctor.findById(req.user).select({ password: 0 });
    if (!viewed) return res.status(400).json("Doctor Not Found");
    console.log("Doctor Details \n" + viewed);
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Doctor Details " + err);
    console.log("Cannot Fetch the Doctor Details" + err);
  }
};

//view one doctor details using id
exports.viewDoctorID = async (req, res) => {
  try {
    let viewed = await Doctor.findById(req.params.id).select({ password: 0 });
    if (!viewed) return res.status(400).json("Doctor Not Found");
    console.log("Doctor Details \n" + viewed);
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Doctor Details " + err);
    console.log("Cannot Fetch the Doctor Details" + err);
  }
};

//view patient details
exports.viewPatient = async (req, res) => {
  try {
    let viewed = await Patient.findOne({ _id: req.params.id }).select({
      password: 0,
    });
    if (!viewed) {
      res.end("Patient Not Found").status(400);
    } else {
      return res.status(200).json("Patient Details: \n " + viewed);
    }
  } catch (err) {
    res.status(400).json("Cannot Fetch the Patient Details " + err);
    console.log("Cannot Fetch the Patient Details" + err);
  }
};

//update a doctor details
exports.updateDoctor = async (req, res) => {
  try {
    let a = await Doctor.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Doctor Details Updated...");
  } catch (err) {
    res.status(400).json("Error During update doctor" + err);
  }
};

//Delete a doctor details
exports.deleteDoctor = async (req, res) => {
  try {
    let docs = await Doctor.findByIdAndDelete(req.params.id);
    if (docs !== null) res.status(200).json(" Deleted SuccessFully...");
    else {
      console.log("Cannot find account to delete");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
