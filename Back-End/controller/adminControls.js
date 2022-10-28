const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const Doctor = require("../model/doctorSchema");
const Appointment = require("../model/appointSchema");
const Patient = require("../model/patientSchema");

const moment = require("moment");

//admin login
exports.logAdmin = async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email Id is Invalid" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid password" });
    else {
      const token = jwt.sign({ _id: user._id }, "Developer_7_Siva");
      res
        .status(201)
        .json({ AccessToken: token, Name: user.name, Type: "Doctor" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
};

//admin Registration
exports.regAdmin = async (req, res) => {
  const rawsalt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(req.body.password, rawsalt);

  const dup = await Admin.findOne({ email: req.body.email });
  if (dup)
    return res
      .status(400)
      .json({ message: "Account Cannot Register. Email was already exits." });

  const du = await Admin.findOne({ phone: req.body.phone });
  if (du)
    return res
      .status(400)
      .json({ message: "Account Cannot Register. PhoneNo was already exits" });

  let adms = new Admin({
    email: req.body.email,
    password: cryptedPassword,
    name: req.body.fName + req.body.lName,
    gender: req.body.gender.toLowerCase(),
    phone: req.body.phone,
  });
  try {
    const ad = await adms.save();
    res.status(201).json({ message: "New Admin Created" });
  } catch (err) {
    res.status(400).json({ message: "Error During New Admin Creation" });
  }
};

//view admins list
exports.viewAdmins = async (req, res) => {
  try {
    let view = await Admin.find({}).select({ password: 0 });
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json("Cannot Retrieve Admins list " + err);
  }
};

//view admin details using params id
exports.viewAdmin = async (req, res) => {
  try {
    let view = await Admin.findById(req.params.id).select({ password: 0 });
    if (view === null) return res.json("invalid Credentials");
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Admin Details " + err);
  }
};

//view admin details using token id
exports.viewAdminProfile = async (req, res) => {
  try {
    let view = await Admin.findById(req.user).select({ password: 0 });
    if (!view) return res.json({ message: "invalid Credentials" });
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json({ message: "Cannot Fetch the Admin Details " + err });
  }
};

//update admin //it's working good but displaying details before updating
exports.updateAdmin = async (req, res) => {
  try {
    // if (req.body.email)
    //   await Admin.findByIdAndUpdate(req.params.id, { email: req.body.email });

    // if (req.body.fName && req.body.lName)
    //   await Admin.findByIdAndUpdate(req.user, {
    //     name: req.body.fName + " " + req.body.lName,
    //   });

    // if (req.body.password) {
    //   let rawsalt = await bcrypt.genSalt(10);
    //   let cryptedPassword = await bcrypt.hash(req.body.password, rawsalt);
    //   await Admin.findByIdAndUpdate(req.user, { password: cryptedPassword });
    // }
    // if (req.body.gender) {
    //   await Admin.findById(req.user, { gender: req.body.gender.toLowerCase() });
    // }

    // if (req.body.phone) {
    //   await Admin.findById(req.user, { phone: req.body.phone });
    // }
    const upd = await Admin.findByIdAndUpdate(req.params.id, req.body);
    if(upd !==null) res.status(200).json("Admin Updated Successfully");
    else res.status(400).json({"message": "Admin Details Not Found"});  
  } catch (err) {
    res.status(400).json("Cannot Update the Admin Details " + err);
  }
};

//delete admin using id

exports.deleteAdmin = async (req, res) => {
  try {
    let deleted = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted the Admin.." + deleted);
  } catch (err) {
    res.status(400).json("Cannot Done the delete operation" + err);
  }
};

//View Particular Doctor using ID in Admin
exports.viewDoctorID = async (req, res) => {
  try {
    let viewed = await Doctor.findById(req.params.id).select({ password: 0 });
    if (!viewed) return res.status(400).json("Doctor Not Found");
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Doctor Details " + err);
  }
};
//View Particular Patient using ID in Admin
exports.viewPatientID = async (req, res) => {
  try {
    let viewed = await Patient.findById(req.params.id);
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Doctor Details " + err);
  }
};

//View Particular Appointment Using Appointment ID in Admin
exports.viewAppointID = async (req, res) => {
  try {
    let viewed = await Appointment.findById(req.params.id, { password: 0 })
      .populate("doctorId", { password: 0 })
      .populate("patientId", { password: 0 })
      .exec();
    if (viewed.doctorId.password) {
      delete viewed.doctorId.password;
    }
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Appointment Details " + err);
  }
};

//view all appointment list using a Single Docter ID
exports.appointsDID = async (req, res) => {
  try {
    let viewed = await Doctor.find(req.query.id);
    if (!viewed) return res.status(400).json("Doctor Not Found");
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Doctor Details " + err);
  }
};

//view appointments using patients ID
exports.appointsPID = async (req, res) => {
  try {
    let viewed = await Doctor.find(req.body.id);
    if (!viewed) return res.status(400).json("Patient ID  Not Found");
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).json("Cannot Fetch the Patient Details " + err);
  }
};

//Multiple Patient Registration Bulk
// //Doctors Registration using bulk Upload
exports.DocMulReg = async (req, res) => {
  if (Array.isArray(req.body)) {
    req.body.forEach(async (element) => {
      const dob = moment(element.birthDate).format("DD-MM-YYYY");
      const liExp = new moment(element.licenseExp).format("YYYY-MM-DD");
      const rawsalt = await bcrypt.genSalt(10);
      const cryptedPassword = await bcrypt.hash(element.password, rawsalt);

      let doct = new Doctor({
        email: element.email,
        password: cryptedPassword,
        name: element.fName + element.lName,
        gender: element.gender,
        birthDate: dob,
        phone: element.phone,
        address: element.address,
        qualification: element.qualification,
        expertise: element.expertise,
        experience: element.experience,
        licenseNo: element.licenseNo,
        licenseExp: liExp,
      });
      try {
        await doct.save();
      } catch (err) {
        res.json("Error: " + err);
      }
      res.end("Inserted Successfully...");
    });
  } else {
    let rsalt = await bcrypt.genSalt(10);
    let cryptedPwd = await bcrypt.hash(req.body.password, rsalt);
    const doc = new Doctor({
      email: req.body.email,
      password: cryptedPwd,
      name: req.body.fName + req.body.lName,
      gender: req.body.gender,
      birthDate: new Date(req.body.birthDate),
      phone: req.body.phone,
      address: req.body.address,
      qualification: req.body.qualification,
      expertise: req.body.expertise,
      experience: req.body.experience,
      licenseNo: req.body.licenseNo,
      licenseExp: new Date(req.body.licenseExp),
    });
    try {
      const saved = await doc.save();
      res.json(saved);
    } catch (err) {
      res.json("Error: " + err);
    }
  }
};

//Patient RegistrationUsing Bulk Upload
exports.PatMulReg = async (req, res) => {
  if (Array.isArray(req.body)) {
    for (let element of req.body) {
      const rawsalt = await bcrypt.genSalt(10);
      const cryptedPassword = await bcrypt.hash(element.password, rawsalt);
      const dob = moment(req.body.birthDate).format("DD-MM-YYYY");
      let pat = new Patient({
        email: element.email,
        password: cryptedPassword,
        name: element.fName + element.lName,
        gender: element.gender,
        birthDate: dob,
        phone: element.phone,
        address: element.address,
        maritalStatus: element.maritalStatus,
        height: element.height,
        weight: element.weight,
      });
      try {
        await pat.save();
      } catch (err) {
        return res.status(400).json("Error: " + err);
      }
      res.end("Inserted Successfully");
    }
  } else {
    let rsalt = await bcrypt.genSalt(10);
    let cryptedPwd = await bcrypt.hash(req.body.password, rsalt);
    const pat = new Patient({
      email: req.body.email,
      password: cryptedPwd,
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
      const saved = await pat.save();
      res.json(saved);
    } catch (err) {
      res.json("Error: " + err);
    }
  }
};

//Bulk Delete Patients
exports.patMulDel = async (req, res) => {
  try {
    await Patient.deleteMany({ _id: { $in: req.body.deleteId } });
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    res.json("Patients Deletion Error: " + err);
  }
};
