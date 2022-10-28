const Appointment = require("../model/appointSchema");
const moment = require("moment");

//register new appointment
exports.bookAppoint = async (req, res) => {
  // console.log(new Date(req.body.datetime).toUTCString());
  // console.log(moment("2022-09-26T18:15:42").format("YYYY-MM-DDTHH:mm:ssZ"));
  // let dateTime = moment(req.body.datetime).toISOString()

  // let dateTim = moment(req.body.date + "T" + req.body.time + ":00").format(
  //   "YYYY-MM-DDTHH:mm:ssZ"
  // );
  // console.log(dateTim);
  // let f = await Appointment.findOne({doctorId: req.body.doctorId})//.where('date').equals(req.body.date).where("time").equals(req.body.time);
  let dateTim = moment(req.body.date + " " + req.body.time, "YYYY-MM-DD HH:mm")
    .toDate();

  let apptExists = await Appointment.find({
    doctorId: req.body.doctorId,
    dateTime: dateTim,
  }).select({ password: 0 });
  // console.log(doc);
  if (apptExists && apptExists.length > 0) {
    res.status(409).send("Appointment has already booked for the given Time Slot. Try Another Slot");
  } else {
    console.log(dateTim);
    let records = new Appointment({
      doctorId: req.body.doctorId,
      patientId: req.user,
      dateTime: dateTim,
      reason: req.body.reason,
      status: req.body.status,
      comments: req.body.comments,
    });
    try {
      await records.save();
      res.status(201).send("Appointment Booked...");
    } catch (err) {
      res.status(400).send("Error During BookingAppointment : \n" + err);
      console.log(err);
    }
  }
};

//view all appointments
exports.viewAppoints = async (req, res) => {
  try {
    let view = await Appointment.find({$or: [{doctorId: req.user},{patientId: req.user}]},{ password: 0 })
      .populate("doctorId", { password: 0 })
      .populate("patientId", { password: 0 })
      .exec();
    console.log("Appointments List \n" + view);
    res.status(200).send(view);
  } catch (err) {
    res.status(400).send("Cannot Retrieve Appointments " + err);
    console.log("Cannot Retrieve the Appointments list" + err);
  }
};

//view Particular appointment using appointment id
exports.viewAppoint = async (req, res) => {
  try {
    let viewed = await Appointment.findById(req.params.id)
      .populate("doctorId", { password: 0 })
      .populate("patientId", { password: 0 })
      .exec();
    if(viewed===null) res.end("Appointment Not Found").status(404);
    console.log("Appointment Details \n" + viewed);
    res.status(200).json(viewed);
  } catch (err) {
    res.status(400).send("Cannot Fetch the Appointment Details " + err);
    console.log("Cannot Fetch the Appointment Details" + err);
  }
};

//update the appointment Details
exports.updateAppoint = async (req, res) => {
  try {
    if (req.body) {

      if ((req.body.status === "accepted") || (req.body.status === "rejected")) {

        await Appointment.findByIdAndUpdate(req.params.id, {status:req.body.status})
      }
      if (req.body.comments) {
        await Appointment.findByIdAndUpdate(req.params.id, {comments: req.body.comments});
      }
    }
    console.log("Appointment Details Updated...");
    res.status(200).send("Appointment Details Updated...");
  } catch (err) {
    res.status(400).end("Cannot Update the Appointment Details " + err);
    console.log("Cannot Update the Appointments Details" + err);
  }
};

//Delete the appointment Details
exports.deleteAppoint = async (req, res) => {
  try {
    let docs = await Appointment.findByIdAndDelete(req.params.id);
    console.log(docs);
    res.status(200).send("Appointment Deleted SuccessFully...\n " + docs);
  } catch (err) {
    res
      .status(400)
      .send("Error During delete Appointment Using condition " + err);
    console.log(err);
  }
};
