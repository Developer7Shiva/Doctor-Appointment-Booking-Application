const router = require("express").Router();
const doctorController = require("../controller/doctorControls");
const patientController = require("../controller/patientControls");
const verifyAdmin = require("../middleware/verifyAdmin");
const appointController = require("../controller/appointControl"); 

const verifyDoctor = require("../middleware/verifyDoctor");

// New Registration Doctor using Admin login
router.post("/reg_doctor",verifyAdmin,doctorController.regDoctor);

router.get("/view_doctors",doctorController.viewDoctors)

// GET SINGLE DOCTOR BY token
router.get("/view_profile", verifyDoctor, doctorController.viewProfile);

//Get a Particular Patients Details
router.get("/view_patient/:id", verifyDoctor, patientController.viewPatient);

//Get a list of Patients of attended by own
router.get("view_patient_list",doctorController.viewPatient);

// UPDATE SINGLE DOCTOR
router.put("/update_doctor", verifyDoctor, doctorController.updateDoctor);

// DELTE MULTIPLE DOCTOR USING CONDITION
router.delete("/delete_doctor",verifyDoctor, doctorController.deleteDoctor);

//view All appointments using Doctors ID

//Update appointments details uinsg appointment ID
router.put("/update_appointment/:id",verifyDoctor,appointController.updateAppoint);

module.exports = router;
