const router = require("express").Router();
const patientControls = require("../controller/patientControls");
const appointControls = require("../controller/appointControl");
const doctorControls = require("../controller/doctorControls")


const verifyPatient = require("../middleware/verifyPatient");
//PATIENTS HOME PAGE
router.get("/", async (req, res) => {
  res.status(200).send("Patient's Landing page...");
});

//Login Patient
router.post("/login", patientControls.logPatient);

//Register Patient
router.post("/reg_patient", patientControls.regPatient);

//patient Profile
router.get("/profile", verifyPatient, patientControls.viewProfile);

//view all doctors details
router.get("/view_doctors", verifyPatient, doctorControls.viewDoctors);

//view complete details of Doctors
router.get("/view_doctor/:id", verifyPatient, doctorControls.viewDoctorID)

//view particular user Details
// router.get("/view_patient", verifyPatient, patientControls.viewPatient);
router.get("/view_patient", patientControls.viewPatients);

//Book a appointment
router.post("/book_appointment", verifyPatient, appointControls.bookAppoint);

//view appointments by patient id and appointment id
router.get("/view_appointment/:id", verifyPatient, appointControls.viewAppoint);

//view all appointments using patient ID
router.get("/view_appointments",verifyPatient,appointControls.viewAppoints);

//view Appointment Details usin Doctor ID

//update patient details
router.put("/update_patient", verifyPatient, patientControls.updatePatient);

//delete Appointment
// router.delete("/delete_appointment/:id", verifyPatient, appointControls.deleteAppoint)

//delete patient 
router.delete("/delete_patient",  verifyPatient, patientControls.deletePatient);



module.exports = router;
