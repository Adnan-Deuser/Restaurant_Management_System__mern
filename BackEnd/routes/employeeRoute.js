const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middleware/tokenVerification");
const { 
    getEmployees, 
    deleteEmployee, 
    applyForLeave, 
    getLeaveRequests, 
    updateLeaveStatus 
} = require("../controllers/employeeController");

router.get("/", isVerifiedUser, getEmployees);
router.delete("/:id", isVerifiedUser, deleteEmployee);
router.post("/leave", isVerifiedUser, applyForLeave);
router.get("/leave", isVerifiedUser, getLeaveRequests);
router.put("/leave/:id", isVerifiedUser, updateLeaveStatus);

module.exports = router;
