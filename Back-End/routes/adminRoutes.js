const router = require("express").Router();
const adminController = require("../controller/adminControls");
const doctorController = require("../controller/doctorControls")
const patientController = require("../controller/patientControls");
const appointController = require("../controller/appointControl");
const verifyAdmin = require("../middleware/verifyAdmin");

//Login Admin
router.post("/login",adminController.logAdmin)

// GET ALL ADMINS LIST
router.get("/view_admins", verifyAdmin, adminController.viewAdmins);

// GET ALL Particular Admin Details
router.get("/view_admin/:id", verifyAdmin, adminController.viewAdmin);

// GET ALL Particular Admin Details
router.get("/view_profile", verifyAdmin, adminController.viewAdminProfile);

//Get all Doctors list
router.get("/view_doctors", verifyAdmin, doctorController.viewDoctors);

//get a particular doctor details
router.get("/view_doctor/:id", verifyAdmin, adminController.viewDoctorID);

//Get  all patients list
router.get("/view_patients", verifyAdmin, patientController.viewPatients);

//Get a particular patients Details
router.get("/view_patient/:id", verifyAdmin,adminController.viewPatientID);


//Get all appointment
router.get("/view_appointments",verifyAdmin, appointController.viewAppoints);

//Get a particular appointment
router.get("/view_appointment/:id",verifyAdmin, adminController.viewAppointID);


// Register a new Admin
router.post("/reg_admin", adminController.regAdmin);

//Register a new Doctor
router.post("/reg_doctor", verifyAdmin, doctorController.regDoctor);

//Register Multiple Doctors(Bulk Upload)
router.post("/reg_bulkdoctor", verifyAdmin,adminController.DocMulReg);

//Delete Multiple Doctors (Bulk Delete)
// router.delete("/del_bulkdoctors",verifyAdmin,adminController.docMulDel);

//Register Multiple Patients(Bulk Upload)
router.post("/reg_bulkpatient", verifyAdmin, adminController.PatMulReg);

//Delete Multiple Delete(Bulk Delete)
router.delete("/del_bulkpatients", verifyAdmin,adminController.patMulDel)

// Update Details Own Details
router.put("/update_admin/:id", verifyAdmin, adminController.updateAdmin);

//Update Doctor Details
router.put("/update_doctor/:id", verifyAdmin, doctorController.updateDoctor);

//update patient Details
router.put("/update_patient/:id", verifyAdmin, patientController.updatePatient);


// Delete the admin using :id
router.delete("/delete_admin/:id", verifyAdmin, adminController.deleteAdmin);

//Delete Patient using :id
router.delete("/delete_patient/:id",verifyAdmin, patientController.deletePatient);

//Delete Doctor using :id
router.delete("/delete_doctor/:id", verifyAdmin, doctorController.deleteDoctor);

module.exports = router;
